import Newsletters from '@/components/newsletters'
import Weather from '@/components/weather'
import pt_BR from 'ant-design-vue/es/locale-provider/pt_BR'
import { defineComponent, ref } from 'vue'
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

        let city = ref('nome-antigo')

        const handleClickCity = (value) => {

            if (!value) return

            city.value = value
        }

        return {

            handleClickCity,
            city
        }
    },
    render() {

        return (
            // <a-config-provider locale={pt_BR}>
            <div id="main">
                <Header />

                <div id="container">
                    <a-row justify="center" gutter={[18, 18]}>

                        <Weather onHandleClick={this.handleClickCity} />

                        <NewCity />

                    </a-row>
                    <Newsletters nameCity={this.city} />
                </div>
            </div>
            // </a-config-provider>
        )
    }
})