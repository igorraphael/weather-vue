import logo from '@/assets/logo-dark.webp'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({

    name: 'Header',

    setup() {

        const visible = ref(false)

        const handleVisible = is => visible.value = is

        return {

            visible,
            handleVisible
        }

    },
    render() {

        return (
            <div class="top-header">
                <div class="left">
                    <a-space size="large" align="center">
                        <MenuUnfoldOutlined onClick={() => this.handleVisible(true)} style={{ fontSize: '1.4em' }} />
                        <div id="logo" />
                    </a-space>
                    <span class="name">Weather</span>
                </div>
                <h3>HOJE</h3>
                <div class="right">
                    <span>Dark mode</span>
                    <a-switch />
                </div>
                <a-drawer
                    placement="left"
                    width={300}
                    visible={this.visible}
                    onClose={() => this.handleVisible(false)}
                >
                    <div style="text-align: center">
                        <a href="https://gxz.com.br" target="_blank">

                            <img src={logo} alt="logo-gxz" />
                            <span style="display: block; margin-top: 1em">Visite-nós</span>
                        </a>

                    </div>
                </a-drawer>
            </div>
        )
    }
})