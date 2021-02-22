import Newsletters from '@/components/newsletters'
import Weather from '@/components/weather'
import pt_BR from 'ant-design-vue/es/locale-provider/pt_BR'
import { defineComponent } from 'vue'
import Header from './header'
import './index.less'
import city from '@/assets/city.svg';
import InlineSvg from 'vue-inline-svg'
import { PlusCircleOutlined, PlusCircleFilled, PlusCircleTwoTone } from '@ant-design/icons-vue'

export default defineComponent({

    render() {

        const sizeIcon = '10em';

        const props = {
            src: city,
            width: sizeIcon,
            height: sizeIcon
        }

        return (
            // <a-config-provider locale={pt_BR}>
            <div id="main">
                <Header />

                <div id="container">
                    <a-row justify="center" gutter={[18, 18]}>
                        {/* {
                            [...Array(2)].map((i, idx) => (
                                <a-col {...{ sm: 14, md: 12, lg: 10, xl: 8 }}>
                                    <Weather />
                                </a-col>
                            ))

                        } */}

                        <Weather />

                        <a-card class="card-new-city">
                            <h2>Add city</h2>

                            <a-button class="btn-add" block onClick={() => alert('aaa')} type="link" v-slots={{
                                icon: () => <PlusCircleTwoTone style={{ fontSize: '4em' }} twoToneColor="#16d9ad" />
                            }}>

                            </a-button>
                            <InlineSvg {...props} />

                        </a-card>
                    </a-row>
                    <Newsletters v-show={true} />
                </div>
            </div>
            // </a-config-provider>
        )
    }
})