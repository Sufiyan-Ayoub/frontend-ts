import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites(){
    return [
      { source: "/@/:method*/:action*", destination: "http://localhost:4983/v1/:method*/:action*" },
      { source: "/@/:method*", destination: "http://localhost:4983/v1/:method*" }
    ]
  },
  cleanDistDir: true,
  poweredByHeader: false,
  // images: {
  //   loader: 'custom',
  //   loaderFile: './imgloader.ts',
  //   remotePatterns: [
  //       {
  //           protocol: "https",
  //           hostname: "*"
  //       }
  //   ]
  // },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
    reactRemoveProperties: true,
  },

  // Experimental TypeScript features
  // experimental: {
  //   // Enable type-checked routing
  //   typedRoutes: true,
    
  //   // Enable server actions
  //   serverActions: {
  //     bodySizeLimit: '1mb',
  //     allowedOrigins: ['*']
  //   },
  // },

  // Performance and build optimizations
  productionBrowserSourceMaps: false,
  reactStrictMode: false,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  
  // webpack: (config) => {

  //   config.resolve.fallback = {
  //     ...config.resolve.fallback,  
  //     fs: false,
  //     path: false,
  //     url: false
  //   };
  //   return config;
  // },

};

export default nextConfig;