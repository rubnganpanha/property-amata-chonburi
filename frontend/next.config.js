/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // เพิ่มการตั้งค่า Webpack เพื่อซ่อน Warning ของ Source Map
  webpack: (config) => {
    // ปิดการแจ้งเตือนเกี่ยวกับ Source Map ที่มาจาก node_modules
    // ซึ่งเป็นปัญหาที่พบบ่อยและไม่ส่งผลกระทบต่อการทำงานของแอป
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Invalid source map/,
    ];
    return config;
  },
};

module.exports = nextConfig;