// import './styles/index.less'
import Antd from 'ant-design-vue'
import { createApp } from 'vue'
import App from './components/app'
import 'ant-design-vue/dist/antd.css'

const Vue = createApp(App)

Vue.use(Antd)

Vue.config.productionTip = false

Vue.mount('#app')

