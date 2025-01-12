/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Habilita o App Router
  },
  images: {
    domains: [], // Adicione domínios de imagens externas, se necessário
  },
};

module.exports = nextConfig;
