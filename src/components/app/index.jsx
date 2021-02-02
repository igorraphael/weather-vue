import { defineComponent, ref } from 'vue'
import './index.less'
import Menu from './left-menu'

export default defineComponent({

    setup() {

        const collapsed = ref(false)

        const handleCollapsed = is => {

            // console.log('handle collapse', is)
            console.log('handle visible...')
            collapsed.value = is
        }
        return {

            collapsed,
            handleCollapsed
        }
    },
    render() {

        return (
            <div class="root-app">
                <header class="header">
                    <div class="left-section">
                        <button onClick={() => this.handleCollapsed(true)}> toggle </button>
                    </div>

                    <h3 class="text-today">Today</h3>

                    <div class="mode-toggle">
                        <span>Light</span>
                        <span>Switch</span>
                    </div>
                </header>

                <Menu
                    collapse={this.collapsed}
                    onCollapse={this.handleCollapsed}
                >
                    <div>A block simple about GXZ</div>
                </Menu>


                <div class="main-container">

                </div>


                {/* <footer class="footer">
                    this is footer
                </footer> */}
            </div>
        )
    }
})