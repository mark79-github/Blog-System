import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

const config = {
    plugins: [react()],
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: []
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    server: {
        port: 3000,
        open: true
    },
    preview: {
        port: 3000,
        open: true
    }
};

export default defineConfig(config)
