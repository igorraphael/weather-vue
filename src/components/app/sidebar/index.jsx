import { defineComponent, Transition, toRef } from 'vue'
import './index.less'

export default defineComponent({

    name: 'Sidebar',
    props: {

        collapse: { type: Boolean, required: true }
    },
    setup(props) {

        const isVisible = toRef(props, 'collapse')

        return {

            isVisible,
        }
    },
    render() {

        return (
            <aside class="sidebar">
                {this.isVisible && <div class="sidebar-backdrop" onClick={() => this.$emit('collapse', !this.isVisible)} />}

                <Transition name="slide-fade">
                    {this.isVisible &&
                        <div class="sidebar-panel">
                            {this.$slots.default()}
                        </div>
                    }
                </Transition>
            </aside>
        )
    }
})