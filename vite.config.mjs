import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

const cherryPickedKeys = [
  "BASE_URL",
  "APP_MODE",
  "APP_DEVELOPE",
  "BASE_URL_develop",
  "SSO_LOGIN_URL_develop",
  "SSO_REFRENCE_URL_develop",
  "BASE_URL_release",
  "SSO_LOGIN_URL_release",
  "SSO_REFRENCE_URL_release",
  "SSO_LOGOUT_URL_release"
];
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);
  return {
    base: './',
    build: {
      outDir: 'build',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 80,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
})
