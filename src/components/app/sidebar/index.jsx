import { defineComponent, toRef } from 'vue'
import logo from '@/assets/logo-dark.webp'
import './index.less'

export default defineComponent({

    name: 'Sidebar',
    props: {

        visible: { type: Boolean, required: true }
    },
    setup(props) {

        const isVisible = toRef(props, 'visible')

        return {

            isVisible,
        }
    },
    render() {

        return (
            <a-drawer
                placement="left"
                width={300}
                visible={this.isVisible}
                onClose={() => this.$emit('visibleChange', !this.isVisible)}
            >
                <div style="text-align: center">
                    <a href="https://gxz.com.br" target="_blank">

                        <img src={logo} alt="logo-gxz" />
                        <span style="display: block; margin-top: 1em">Visite-nós</span>
                    </a>

                </div>
            </a-drawer>
        )
    }
})