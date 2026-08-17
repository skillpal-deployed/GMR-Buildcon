/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Where /api/* is proxied:
  //  • local dev            -> http://localhost:4000 (standalone Express)
  //  • split deploy         -> API_ORIGIN (Express on Render/Railway/etc.)
  //  • all-in-one on Vercel -> no proxy; vercel.json routes /api to the function
  async rewrites() {
    const origin =
      process.env.API_ORIGIN ||
      (process.env.NODE_ENV === "development" ? "http://localhost:4000" : "");
    if (!origin) return [];
    return [{ source: "/api/:path*", destination: `${origin}/api/:path*` }];
  },

  images: {
    // Allow featured images / gallery URLs from any https host (client pastes CDN URLs).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
