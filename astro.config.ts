import { defineConfig, envField, passthroughImageService } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import graphql from '@rollup/plugin-graphql';
import sitemap from '@astrojs/sitemap';
import Sonda from 'sonda/astro';
import type { PluginOption } from 'vite';
import pkg from './package.json';
import { isPreview } from './config/preview';
import { output } from './config/output';
import serviceWorker from './config/astro/service-worker-integration.ts';

import react from '@astrojs/react';

const isAnalyseMode = process.env.ANALYZE === 'true';
const productionUrl = `https://${pkg.name}.pages.dev`; // overwrite if you have a custom domain
const localhostPort = 4323; // 4323 is "head" in T9

export const siteUrl = process.env.CF_PAGES
  ? (process.env.CF_PAGES_BRANCH === 'main')
    ? productionUrl
    : process.env.CF_PAGES_URL
  : `http://localhost:${localhostPort}`;

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  env: {
    schema: {
      DATOCMS_READONLY_API_TOKEN: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.DATOCMS_READONLY_API_TOKEN
      }),
      HEAD_START_PREVIEW_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        default: process.env.HEAD_START_PREVIEW_SECRET
      }),
      HEAD_START_PREVIEW: envField.boolean({
        context: 'server',
        access: 'secret',
        default: isPreview
      }),
      PUBLIC_IS_PRODUCTION: envField.boolean({
        context: 'server',
        access: 'public',
        default: process.env.NODE_ENV === 'production'
      })
    }
  },
  image: {
    // cloudflare is not supported by the Astro image service
    // @see https://docs.astro.build/en/guides/images/#configure-no-op-passthrough-service
    service: passthroughImageService()
  },
  integrations: [serviceWorker(), sitemap(), Sonda({
    enabled: isAnalyseMode,
    filename: 'reports/sonda-report-[env].html',
    server: true,
  }), react()],
  output: isPreview ? 'server' : output, // @see `/config/output.ts``
  server: { port: localhostPort },
  site: siteUrl,
  vite: {
    build: {
      sourcemap: isAnalyseMode,
    },
    plugins: [
      graphql() as PluginOption,
    ],
    optimizeDeps: {
      exclude: ['msw'],
    },
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD && {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
  },
});
