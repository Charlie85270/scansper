const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  distDir: "build",
  publicRuntimeConfig: {
    NETLIFY_NEXT_PLUGIN_SKIP: true,
    // add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
  },
  compiler: {
    reactStrictMode: true,
    styledComponents: {
      // Enable display of the component name along with the generated className (needed for debugging).
      displayName: true,
      // Enable SSR support
      ssr: true,
      // Optional
      fileName: false,
    },
  },
  webpack: config => {
    // extend your webpack configuration here
    return config;
  },
});
