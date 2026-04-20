import { NextRequest, NextResponse } from 'next/server'
import ExcelJS from 'exceljs'
import { supabaseAdmin } from '@/lib/supabase'

const STATUS_COLORS: Record<string, string> = {
  'New':        'FFF3CD',
  'Contacted':  'CCE5FF',
  'Follow-Up':  'FFD6E0',
  'Enrolled':   'D4EDDA',
}

function toIST(date: Date): string {
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  })
}

export async function GET(req: NextRequest) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  if (!secret || secret !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── Filters ───────────────────────────────────────────────────────────────
  const statusFilter = searchParams.get('status') ?? ''
  const courseFilter = searchParams.get('course') ?? ''

  // ── Paginated Supabase fetch ───────────────────────────────────────────────
  type LeadRow = {
    id: string
    name: string
    phone: string
    email: string | null
    course: string
    status: string
    city: string
    source_page: string | null
    created_at: string
  }

  const allRows: LeadRow[] = []
  const PAGE = 1000
  let from = 0

  while (true) {
    let query = supabaseAdmin
      .from('leads')
      .select('id,name,phone,email,course,status,city,source_page,created_at')
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1)

    if (statusFilter) query = query.eq('status', statusFilter)
    if (courseFilter) query = query.ilike('course', `%${courseFilter}%`)

    const { data, error } = await query

    if (error) {
      console.error('Supabase export error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!data || data.length === 0) break
    allRows.push(...(data as LeadRow[]))
    if (data.length < PAGE) break
    from += PAGE
  }

  // ── Build workbook ─────────────────────────────────────────────────────────
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Career Ambition Education'
  wb.created = new Date()

  // ═══════════════════════════════ Sheet 1: All Leads ═══════════════════════
  const ws = wb.addWorksheet('All Leads', {
    views: [{ state: 'frozen', ySplit: 3 }],
  })

  ws.columns = [
    { key: 'id',          width: 38 },
    { key: 'name',        width: 22 },
    { key: 'phone',       width: 14 },
    { key: 'email',       width: 28 },
    { key: 'course',      width: 22 },
    { key: 'status',      width: 14 },
    { key: 'city',        width: 16 },
    { key: 'source_page', width: 16 },
    { key: 'created_at',  width: 22 },
  ]

  // Row 1 — title
  ws.mergeCells('A1:I1')
  const titleCell = ws.getCell('A1')
  titleCell.value = 'Career Ambition Education — Lead Database'
  titleCell.font  = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } }
  titleCell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A56DB' } }
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(1).height = 28

  // Row 2 — subtitle (timestamp)
  ws.mergeCells('A2:I2')
  const subCell = ws.getCell('A2')
  subCell.value = `Generated: ${toIST(new Date())} IST${statusFilter ? ` · Status: ${statusFilter}` : ''}${courseFilter ? ` · Course: ${courseFilter}` : ''}`
  subCell.font  = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF666666' } }
  subCell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEEEFFF' } }
  subCell.alignment = { horizontal: 'center', vertical: 'middle' }
  ws.getRow(2).height = 18

  // Row 3 — headers
  const HEADERS = ['ID', 'Name', 'Phone', 'Email', 'Course', 'Status', 'City', 'Source Page', 'Submitted At']
  const headerRow = ws.getRow(3)
  headerRow.height = 20
  HEADERS.forEach((h, i) => {
    const cell = headerRow.getCell(i + 1)
    cell.value = h
    cell.font  = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A5F' } }
    cell.alignment = { horizontal: 'center', vertical: 'middle' }
    cell.border = {
      top:    { style: 'thin', color: { argb: 'FFCCCCCC' } },
      left:   { style: 'thin', color: { argb: 'FFCCCCCC' } },
      bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
      right:  { style: 'thin', color: { argb: 'FFCCCCCC' } },
    }
  })

  // Data rows (starting at row 4)
  allRows.forEach((lead, idx) => {
    const rowNum  = idx + 4
    const zebra   = idx % 2 === 0 ? 'FFFFFFFF' : 'FFF5F7FF'
    const dataRow = ws.getRow(rowNum)
    dataRow.height = 16

    const values = [
      lead.id,
      lead.name,
      lead.phone,
      lead.email ?? '',
      lead.course,
      lead.status,
      lead.city,
      lead.source_page ?? '',
      toIST(new Date(lead.created_at)),
    ]

    values.forEach((val, colIdx) => {
      const cell = dataRow.getCell(colIdx + 1)
      cell.value = val
      cell.font  = { name: 'Arial', size: 9 }

      const isStatus = colIdx === 5
      const statusColor = STATUS_COLORS[lead.status] ?? null
      cell.fill = {
        type: 'pattern', pattern: 'solid',
        fgColor: { argb: isStatus && statusColor ? `FF${statusColor}` : zebra },
      }
      if (isStatus) {
        cell.font = { name: 'Arial', size: 9, bold: true }
        cell.alignment = { horizontal: 'center', vertical: 'middle' }
      }
      cell.border = {
        top:    { style: 'thin', color: { argb: 'FFDDDDDD' } },
        left:   { style: 'thin', color: { argb: 'FFDDDDDD' } },
        bottom: { style: 'thin', color: { argb: 'FFDDDDDD' } },
        right:  { style: 'thin', color: { argb: 'FFDDDDDD' } },
      }
    })
  })

  // Auto-filter
  const lastRow = Math.max(allRows.length + 3, 4)
  ws.autoFilter = { from: 'A3', to: `I${lastRow}` }

  // ═══════════════════════════════ Sheet 2: Summary ═════════════════════════
  const ws2 = wb.addWorksheet('Summary')
  ws2.columns = [
    { key: 'label', width: 20 },
    { key: 'value', width: 16 },
    { key: 'note',  width: 28 },
  ]

  // Title
  ws2.mergeCells('A1:C1')
  const sumTitle = ws2.getCell('A1')
  sumTitle.value = 'Summary Dashboard'
  sumTitle.font  = { name: 'Arial', size: 13, bold: true, color: { argb: 'FFFFFFFF' } }
  sumTitle.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A56DB' } }
  sumTitle.alignment = { horizontal: 'center', vertical: 'middle' }
  ws2.getRow(1).height = 26

  ws2.getRow(2).height = 8 // spacer

  const dataRef = `'All Leads'!B4:B${lastRow}`
  const statusRange = `'All Leads'!F4:F${lastRow}`

  const kpis: Array<{ label: string; formula: string; numFmt?: string }> = [
    { label: 'Total Leads',    formula: `=COUNTA(${dataRef})` },
    { label: 'New',            formula: `=COUNTIF(${statusRange},"New")` },
    { label: 'Contacted',      formula: `=COUNTIF(${statusRange},"Contacted")` },
    { label: 'Follow-Up',      formula: `=COUNTIF(${statusRange},"Follow-Up")` },
    { label: 'Enrolled',       formula: `=COUNTIF(${statusRange},"Enrolled")` },
    { label: 'Conversion Rate',formula: `=IFERROR(COUNTIF(${statusRange},"Enrolled")/COUNTA(${dataRef}),0)`, numFmt: '0.0%' },
  ]

  kpis.forEach(({ label, formula, numFmt }, i) => {
    const rowNum = i + 3
    const labelCell = ws2.getCell(rowNum, 1)
    const valueCell = ws2.getCell(rowNum, 2)

    labelCell.value = label
    labelCell.font  = { name: 'Arial', size: 10, bold: true }
    labelCell.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: i % 2 === 0 ? 'FFF5F7FF' : 'FFFFFFFF' } }
    labelCell.alignment = { vertical: 'middle' }
    ws2.getRow(rowNum).height = 20

    valueCell.value  = { formula: formula.slice(1), result: 0 }
    valueCell.font   = { name: 'Arial', size: 10 }
    valueCell.fill   = labelCell.fill
    valueCell.alignment = { horizontal: 'center', vertical: 'middle' }
    if (numFmt) valueCell.numFmt = numFmt

    for (let col = 1; col <= 2; col++) {
      ws2.getCell(rowNum, col).border = {
        top:    { style: 'thin', color: { argb: 'FFCCCCCC' } },
        left:   { style: 'thin', color: { argb: 'FFCCCCCC' } },
        bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
        right:  { style: 'thin', color: { argb: 'FFCCCCCC' } },
      }
    }
  })

  // ── Return buffer ──────────────────────────────────────────────────────────
  const buffer = await wb.xlsx.writeBuffer()
  const filename = `cae-leads-${new Date().toISOString().slice(0, 10)}.xlsx`

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  })
}
