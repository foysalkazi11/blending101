module.exports = {
  reactStrictMode: true,
  ignoreDuringBuilds: true,
  trailingSlash: true,
  staticPageGenerationTimeout: 1500,
  images:{
    domains:["source.unsplash.com","./theme/wiki/WikiCenter/Assets/cardiogram.svg"]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
