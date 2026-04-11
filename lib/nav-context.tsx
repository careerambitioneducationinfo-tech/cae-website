'use client'

import { createContext, useContext, useState } from 'react'

interface NavContextType {
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
}

const NavContext = createContext<NavContextType>({
  drawerOpen: false,
  setDrawerOpen: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <NavContext.Provider value={{ drawerOpen, setDrawerOpen }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
