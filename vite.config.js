import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                catalog: resolve(__dirname, 'catalog.html'),
                category: resolve(__dirname, 'category.html'),
                product: resolve(__dirname, 'product-show.html'),
                orderThanks: resolve(__dirname, 'order-thanks.html'),
                favorite: resolve(__dirname, 'favorite.html'),
                cart: resolve(__dirname, 'cart.html'),
            },
        },
    },
    plugins: [
        handlebars({
            partialDirectory: resolve(__dirname, 'partials'),
        }),
    ],
})