import { defineComponent, ref } from 'vue'
import './index.less'
import Newsletters from '@/components/newsletters'
import Sidebar from './sidebar'
import Weather from '@/components/weather'

export default defineComponent({

    setup() {

        const collapsed = ref(false)

        const handleCollapsed = is => collapsed.value = is
        return {

            collapsed,
            handleCollapsed
        }
    },
    render() {

        return (
            <div class="root-app">
                <header class="header">
                    <div class="menu">
                        {/* <button onClick={() => this.handleCollapsed(true)}> toggle </button> */}

                        <i class="icon" />
                        <div id="logo" />
                        <span>Weather</span>
                    </div>

                    <h3>Today</h3>

                    <div class="mode-toggle">
                        <span>Light</span>
                        <span>Switch</span>
                    </div>
                </header>

                <Sidebar
                    collapse={this.collapsed}
                    onCollapse={this.handleCollapsed}
                >
                    <div>A block simple about GXZ</div>
                </Sidebar>

                <div class="main-container">
                    <div class="slider">
                        <Weather />
                        <Weather />
                        <Weather />
                    </div>

                    <div class="content-weather">
                        <Newsletters />
                    </div>

                </div>

            </div>
        )
    }
})