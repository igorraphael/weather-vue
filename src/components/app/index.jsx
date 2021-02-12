import Newsletters from '@/components/newsletters'
import Weather from '@/components/weather'
import pt_BR from 'ant-design-vue/es/locale-provider/pt_BR'
import { defineComponent } from 'vue'
import Header from './header'
import './index.less'

export default defineComponent({

    render() {

        return (
            <a-config-provider locale={pt_BR}>
                <div id="main">
                    <Header />

                    <div id="container">
                        <a-row gutter={[48, 48]} justify="space-around">
                            {
                                [...Array(3)].map((i, idx) => (
                                    <a-col {...{ sm: 14, md: 12, lg: 10, xl: 6 }}>
                                        <Weather />
                                    </a-col>
                                ))
                            }
                        </a-row>

                        <Newsletters />
                    </div>
                </div>
            </a-config-provider>
        )
    }
})