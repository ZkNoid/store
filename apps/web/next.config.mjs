import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { withSentryConfig } from '@sentry/nextjs';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ————————————————————————————————
  // 1) Make sure you never opt into Turbopack in prod!
  //    Just use the default webpack build (`next build`).
  // ————————————————————————————————

  // ————————————————————————————————
  // 2) Merge your images block (remove the placeholder ** rule,
  //    only list the hosts you actually need).
  // ————————————————————————————————
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
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

  // ————————————————————————————————
  // 3) Experimental flags: only the ones you actually need go here
  //    (for Next.js 15, reactCompiler is a top-level flag if you really want it;
  //     most people don’t need to touch it).
  // ————————————————————————————————
  experimental: {
    optimizePackageImports: ['@zknoid/sdk', '@zknoid/games', 'zknoid-chain-dev'],
  },

  // ————————————————————————————————
  // 4) Your Webpack override: alias + wasm + top-level await
  // ————————————————————————————————
  webpack(config, { isServer }) {
    if (!isServer) {
      // 1️⃣ alias o1js to its browser bundle
      config.resolve.alias = {
        ...config.resolve.alias,
        o1js: path.resolve(__dirname, 'node_modules/o1js/dist/web/index.js'),
      };

      // 2️⃣ make sure .wasm is resolvable without an explicit extension
      config.resolve.extensions = [...(config.resolve.extensions || []), '.wasm'];

      // 3️⃣ tell webpack to copy o1js’s .wasm out as a static resource
      config.module.rules.push({
        test: /\.wasm$/i,
        include: path.resolve(__dirname, 'node_modules/o1js/dist/web'),
        type: 'asset/resource',
        generator: {
          // match o1js’s runtime fetch: /_next/static/wasm/o1.wasm
          filename: 'static/wasm/[name][ext]',
        },
      });

      // 4️⃣ ALSO push CopyWebpackPlugin *in case* some files aren’t
      //    referenced via URL imports at build-time:
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'node_modules/o1js/dist/web/web_bindings/*.wasm'),
              to: 'static/wasm/[name][ext]',
            },
          ],
        })
      );
    }

    // you can drop asyncWebAssembly/topLevelAwait if you're not
    // actually using the `import foo from "./foo.wasm"` form,
    // but it won’t hurt to leave it in:
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    return {
      ...config,
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            minify: TerserPlugin.swcMinify,
            terserOptions: {
              compress: { keep_classnames: true, keep_fnames: true },
              mangle: { keep_classnames: true, keep_fnames: true },
            },
            exclude: /node_modules/,
          }),
        ],
      },
    };
  },

  eslint: {
    dirs: ['app', 'components', 'constants', 'containers', 'games', 'lib'],
  },
  productionBrowserSourceMaps: false,
  transpilePackages: ['@zknoid/sdk', '@zknoid/games', 'zknoid-chain-dev'],
};

export default withSentryConfig(nextConfig, {
  org: 'zknoid-2z',
  project: 'javascript-nextjs',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  reactComponentAnnotation: { enabled: true },
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
  sourcemaps: {
    disable: true,
    deleteSourcemapsAfterUpload: true,
  },
});
