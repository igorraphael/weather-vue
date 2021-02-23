import Newsletters from '@/components/newsletters'
import Weather from '@/components/weather'
import pt_BR from 'ant-design-vue/es/locale-provider/pt_BR'
import { defineComponent, reactive, ref } from 'vue'
import Header from './header'
import './index.less'

import InlineSvg from 'vue-inline-svg'
import city from '@/assets/city.svg'
import { PlusCircleTwoTone } from '@ant-design/icons-vue'

const NewCity = defineComponent({

    name: 'NewCity',
    setup() {

        const propsIcon = {

            src: '/src/assets/city.svg',
            width: '10em',
            height: '10em'
        }

        return () => (
            <a-card class="card-new-city">
                <h2>Add city</h2>

                <a-button class="btn-add" block onClick={() => alert('aaa')} type="link" v-slots={{
                    icon: () => <PlusCircleTwoTone style={{ fontSize: '4em' }} twoToneColor="#16d9ad" />
                }}>

                </a-button>
                <InlineSvg {...propsIcon} />
            </a-card>
        )
    }
})

export default defineComponent({

    setup() {

        let currentCity = reactive({

            name: '',
            coords: {

                lat: 0,
                lon: 0
            },
        })


        const handleCoords = (coords) => currentCity.coords = coords

        const handleClick = (value) => {

            if (!value) return

            currentCity.name = value
        }

        return {

            handleCoords,
            handleClick,
            currentCity
        }
    },
    render() {

        return (
            // <a-config-provider locale={pt_BR}>
            <div id="main">
                <Header />

                <div id="container">
                    <a-row justify="center" gutter={[18, 18]}>

                        <Weather
                            onHandleClick={this.handleClick}
                            onCoords={this.handleCoords}
                        />

                        <NewCity />

                    </a-row>
                    <Newsletters city={this.currentCity} />
                </div>
            </div>
            // </a-config-provider>
        )
    }
})