import Newsletters from '@/components/newsletters'
import Weather from '@/components/weather'
import { MenuOutlined } from '@ant-design/icons-vue'
import pt_BR from 'ant-design-vue/es/locale-provider/pt_BR'
import { defineComponent, ref } from 'vue'
import './index.less'
import Sidebar from './sidebar'

export default defineComponent({

    setup() {

        const visible = ref(false)

        const handleClick = is => visible.value = is
        return {

            visible,
            handleClick
        }
    },
    render() {

        return (
            <a-config-provider locale={pt_BR}>
                <div id="main">
                    <div class="top-header">
                        <div class="left">
                            <MenuOutlined onClick={() => this.handleClick(true)} />

                            <Sidebar visible={this.visible} onVisibleChange={(visible) => this.visible = visible} />

                            <div id="logo" />
                            <span>Weather</span>
                        </div>

                        <h3>HOJE</h3>

                        <div class="right">
                            <span>Dark mode</span>
                            <a-switch />
                        </div>
                    </div>
                    <div id="container">
                        <a-row gutter={[48, 48]}>
                            {
                                [...Array(3)].map((i, idx) => (
                                    <a-col {...{ sm: 24, md: 10, lg: 8, xl: 5 }}>
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