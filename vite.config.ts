import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        { enforce: 'pre', ...mdx({
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
          include: /\.mdx$/,
        }) },
        { enforce: 'pre', ...mdx({
          remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
          include: /\.md$/,
        }) },
        react()
      ],
      // No longer injecting Gemini API keys into the client
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      ssr: {
        noExternal: ['react-helmet-async', 'gsap']
      },
      build: {
        chunkSizeWarningLimit: 2000,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) return 'vendor';
              if (id.includes('src/data/projects')) return 'projects-data';
            },
          },
        },
      },
    };
});
