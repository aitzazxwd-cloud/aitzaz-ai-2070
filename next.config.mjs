/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint is wired in a later phase; keep builds green meanwhile.
  eslint: { ignoreDuringBuilds: true },
  // pg is a Node-only native-ish module — keep it out of the client bundle.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
