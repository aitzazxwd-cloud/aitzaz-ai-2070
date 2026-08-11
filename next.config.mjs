/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint is wired in a later phase; keep builds green meanwhile.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
