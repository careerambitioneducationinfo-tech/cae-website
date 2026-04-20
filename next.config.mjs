/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // avif → ~40% smaller than webp; webp as fallback
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 30 days — critical for Railway (no CDN)
    // Without this, images are re-optimized on every server restart
    minimumCacheTTL: 2592000,
    // Tuned for Bihar mobile audience (375–828px) + desktop
    deviceSizes: [375, 640, 750, 828, 1080, 1280],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
