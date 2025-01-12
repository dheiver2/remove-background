/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Adiciona suporte para WebAssembly e WebGPU
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // Configurações específicas para o onnxruntime-web
    config.resolve.alias = {
      ...config.resolve.alias,
      'onnxruntime-web': 'onnxruntime-web/dist/ort.webgpu.min.js',
    };

    return config;
  },
  images: {
    domains: [], // Adicione domínios de imagens externas, se necessário
  },
};

module.exports = nextConfig;
