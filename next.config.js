/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  assetPrefix: process.env.BASE_PATH,
  basePath: process.env.BASE_PATH,
  distDir: process.env.BUILD_PATH,
  images: {
    loader: 'akamai',
    path: '',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client.
    staticFolder: '/static',
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    // Will only be available on the server side.
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.module.rules.push({
      test: /\.md$/,
      loader: 'null-loader',
    });
    config.module.rules.push({
      test: /LICENSE/,
      loader: 'null-loader',
    });
    config.module.rules.push({
      test: /\.wasm$/,
      loader: "file-loader",
      type: "javascript/auto",
      options: {
        publicPath: '_next/static/wasm/',
        outputPath: `static/wasm/`
      }
    });
    return config;
  }
}

module.exports = nextConfig
