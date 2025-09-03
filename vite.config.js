import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './', // Use relative paths
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    // Copy additional assets including PDFs
    copyPublicDir: true,
    assetsInlineLimit: 0, // Don't inline any assets, keep them as separate files
  },
  server: {
    open: true, // Auto open browser
    port: 3000,
  },
  // Configure asset handling
  assetsInclude: ['**/*.pdf', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.svg'],
  // Ensure PDF files are treated as assets and copied to build
  publicDir: 'src/assets',
});