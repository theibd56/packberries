import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                catalog: resolve(__dirname, 'catalog.html'),
                category: resolve(__dirname, 'category.html'),
                product: resolve(__dirname, 'product-show.html'),
            },
        },
    },
})