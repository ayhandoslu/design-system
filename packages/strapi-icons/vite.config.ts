import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      target: 'esnext',
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        formats: ['cjs', 'es'],
        fileName(format) {
          return `[name].${format === 'es' ? 'js' : format}`;
        },
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: (id) => !id.startsWith('.') && !id.startsWith('/'),
        output: {
          dir: 'dist',
          preserveModules: env.DTS !== 'true',
        },
      },
    },
    plugins: env.DTS !== "true" ? [react()] : [dts(), react()],
  };
});
