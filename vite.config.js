import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default {

    alias: [

        { find: '@', replacement: resolve(__dirname, 'src') }
    ],
    css: {

        preprocessorOptions: {

            less: {

                javascriptEnabled: true
            }
        }
    },
    plugins: [
        vue(),
        vueJsx(),
    ]
}
