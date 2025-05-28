import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { withSentryConfig } from '@sentry/nextjs';
// import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },

  experimental: {
    turbopack: false,
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        o1js: path.resolve(__dirname, 'node_modules/o1js/dist/web/index.js'),
      };
    }

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
      asyncWebAssembly: true,
    };

    config.module.rules.push({
      test: /\.wasm$/i,
      type: 'webassembly/async',
    });

    return {
      ...config,
      // module: {
      //   ...config.module,
      //   rules: [
      //     ...config.module.rules,
      //     {
      //       test: /\.(svg)$/i,
      //       type: "asset",
      //     },
      //   ],
      // },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.swcMinify,
            terserOptions: {
              sourceMap: false,
              compress: {
                keep_classnames: true,
                keep_fnames: true,
              },
              mangle: {
                keep_classnames: true,
                keep_fnames: true,
              },
            },
            exclude: /node_modules/,
          }),
          // new ImageMinimizerPlugin({
          //   minimizer: {
          //     implementation: ImageMinimizerPlugin.svgoMinify,
          //     options: {
          //       plugins: [
          //         "svgo",
          //         {
          //           plugins: [
          //             {
          //               name: "preset-default",
          //               params: {
          //                 overrides: {
          //                   removeViewBox: false,
          //                   addAttributesToSVGElement: {
          //                     params: {
          //                       attributes: [
          //                         { xmlns: "http://www.w3.org/2000/svg" },
          //                       ],
          //                     },
          //                   },
          //                 },
          //               },
          //             },
          //           ]
          //         }
          //       ]
          //     }
          //   },
          // }),
        ],
      },
    };
  },
  eslint: {
    dirs: ['app', 'components', 'constants', 'containers', 'games', 'lib'],
  },
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['@zknoid/sdk', '@zknoid/games', 'zknoid-chain-dev'],
  },
  productionBrowserSourceMaps: false,
  transpilePackages: ['@zknoid/sdk', '@zknoid/games', 'zknoid-chain-dev'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dw4kivbv0/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'zknoid-2z',
  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: true,
    deleteSourcemapsAfterUpload: true,
  },
});
