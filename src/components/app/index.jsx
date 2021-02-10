import { defineComponent, ref } from 'vue'
import './index.less'
import Newsletters from '@/components/newsletters'
import Sidebar from './sidebar'
import Weather from '@/components/weather'
import IconSVG from 'vue-inline-svg'

import bars from '@/assets/menu-bars.svg'

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
                        <IconSVG
                            class="icon"
                            src={bars}
                            width="42"
                            heigth="42"
                            fill="white"
                            onClick={() => this.handleCollapsed(true)}
                        />
                        <div id="logo" />
                        <span>Weather</span>
                    </div>

                    <h3>HOJE</h3>

                    <div class="mode-toggle">
                        <span>Light</span>
                        <span>Switch</span>
                    </div>
                </header>

                <Sidebar
                    collapse={this.collapsed}
                    onCollapse={this.handleCollapsed}
                >
                    <div>Developed by</div>

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