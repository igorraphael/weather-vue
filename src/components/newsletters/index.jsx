import Avatar from '@/assets/avatar.jpg'
import loadingSVG from '@/assets/loading-white.svg'
import { Spin } from 'ant-design-vue'
import { defineComponent, ref, toRef, Transition, watch } from 'vue'
import InlineSvg from 'vue-inline-svg'
import './index.less'

Spin.setDefaultIndicator({

    indicator: () => <div class="indicator-loading"><InlineSvg src={loadingSVG} width="3em" height="3em" /></div>
});


const tweets = [
    {
        id: 1,
        username: 'user256',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem..'
    },
    {
        id: 2,
        username: 'Iasd5',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
    {
        id: 3,
        username: 'fr0st_88',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
];

const days = [
    {
        id: 1,
        dia: 'SEG',
        grau: 24,
        label: 'SOL'
    },
    {
        id: 2,
        dia: 'TER',
        grau: 15,
        label: 'CHUVA'
    },
    {
        id: 3,
        dia: 'QUA',
        grau: 20,
        label: 'NUBALDO'
    },
    {
        id: 4,
        dia: 'QUI',
        grau: 26,
        label: 'SOL'
    },
];

const WelcomeBlock = () => (
    <a-row class="block-init">
        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 24 }}>
            <h1>Welcome!</h1>
            <p>xWeather is a simple application of weather with base your location and some tweets about your place.</p>
            <p>This app is development, for more information check the repository in <a href="#" target="_blank">Github</a>.</p>
        </a-col>
    </a-row>
)

export default defineComponent({

    props: {

        city: { type: Object, required: false }
    },

    name: 'Newsletters',

    setup(props) {

        const nameCity = ref('')

        let hasCity = ref(false)

        watch(() => props.city.name, (value) => {

            if (value) {

                hasCity.value = true
                nameCity.value = value

                const { lat, lon } = props.city.coords

                callApi(lat, lon)
            }
        })

        const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=current,minutely,hourly,alerts&appid=ea51c9a4b740d49ce7b1682daea3d231`


        const callApi = (lat, lon) => {

            fetch(API_URL(lat, lon)).then(response => response.json()).then(data => {

                if (data) {

                    const { daily } = data

                    let arrDays = []
                    daily.map(i => {

                        let current = new Date(i.dt * 1000)
                        arrDays.push({

                            data: current.toLocaleDateString('pt-BR'),
                            day: current.getDay()
                        })
                    })


                    console.log(arrDays)
                }

            }).catch(err => {

                console.log('deu erro...', err)

            }).finally(() => console.log('finish...'))
        }


        return {

            nameCity,
            hasCity
        }
    },
    render() {

        return (
            <>
                <WelcomeBlock v-show={!this.hasCity} />

                <Transition name="fade">
                    <a-row v-show={this.hasCity} class="newsletter">
                        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 8 }} class="tt-feed">
                            <div class="tt-header">
                                <h2>Twitter Feed</h2>
                                <span>#{this.nameCity}</span>
                            </div>
                            <a-list
                                class="tt-content"
                                dataSource={tweets}
                                loading={true}
                                renderItem={({ item }) => (
                                    <a-list-item key={item.id}>
                                        <a-list-item-meta v-slots={{
                                            title: () => <a href="#" class="tt-username">@{item.username}</a>,
                                            avatar: () => <img class="avatar" src={Avatar} onError={(e) => console.log(e)} />
                                        }}
                                            description={`${item.tweet}`}
                                        />
                                    </a-list-item>
                                )}
                            />
                        </a-col>
                        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 16 }} style="padding: 18px">
                            <a-list
                                class="week-days"
                                loading={true}
                                dataSource={days}
                                grid={{ gutter: 16, column: 4 }}
                                renderItem={({ item }) => (

                                    <a-list-item>
                                        <a-card class="card-day" bordered={false}>
                                            <h2 class="day-week">{item.dia}</h2>
                                            <i class="icon sun" />
                                            <span>{item.grau} º</span>
                                            <span>{item.label}</span>
                                        </a-card>
                                    </a-list-item>
                                )}
                            />
                        </a-col>
                    </a-row>
                </Transition>
            </>
        )
    }
})