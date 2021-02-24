import Avatar from '@/assets/avatar.jpg'
import loadingSVG from '@/assets/loading-white.svg'
import { Spin } from 'ant-design-vue'
import { defineComponent, reactive, ref, Transition, watch } from 'vue'

import InlineSvg from 'vue-inline-svg'
import pathIcons from '@/components/weather/iconsPath'
import './index.less'

import Icon from '@ant-design/icons-vue';
import tempMax from '@/assets/temp-max.svg'


Spin.setDefaultIndicator({

    indicator: () => <div class="indicator-loading"><InlineSvg src={loadingSVG} width="3em" height="3em" /></div>
})

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
]

const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']

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

        let weekData = reactive([])
        let loading = ref(false)


        watch(() => props.city.name, (value) => {

            if (value) {

                hasCity.value = true
                nameCity.value = value

                const { lat, lon } = props.city.coords

                handleApiWeather(lat, lon)
            }
        })

        const WEATHER_API = (lat, lon) => `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&exclude=current,minutely,hourly,alerts&appid=ea51c9a4b740d49ce7b1682daea3d231`

        const handleApiWeather = (lat, lon) => {

            loading.value = true

            fetch(WEATHER_API(lat, lon)).then(response => response.json()).then(data => {

                if (data) {

                    const { daily } = data

                    for (let i = 1; i < 5; i++) {

                        let current = new Date(daily[i].dt * 1000)
                        let numDay = current.getDay()

                        weekData.push({

                            data: current.toLocaleDateString('pt-BR'),
                            dayNumber: numDay,
                            dayLabel: daysOfWeek[numDay],
                            temp: {
                                max: daily[i].temp.max,
                                min: daily[i].temp.min
                            },
                            weather: daily[i].weather[0]
                        })
                    }
                }

            }).catch(err => {

                console.log('deu erro...', err)

            }).finally(() => loading.value = false)
        }

        async function fecthAll(lat, lon) {

            const [weatherResponse, ttResponse] = await Promise.all([
                fetch(WEATHER_API(lat, lon)),
                fetch(TT_API(nameCity.value), {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: new Headers({

                        'authorization': `Bearer ${TT_BEARER}`,
                    })
                })
            ])

            const weatherData = await weatherResponse.json()
            const ttData = await ttResponse.json()

            return [weatherData, ttData]
        }

        return {

            nameCity,
            loading,
            weekData,
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
                                loading={this.loading}
                                dataSource={this.weekData}
                                grid={{ gutter: 16, column: 4 }}
                                renderItem={({ item }) => (

                                    <a-list-item>
                                        <a-card class="card-day" bordered={false}>
                                            <h2 class="day-week">{item.dayLabel}</h2>
                                            {/* <i class="icon sun" /> */}

                                            <a-space size="middle" direction="vertical">
                                                <InlineSvg width="6.5em" height="6.5em" src={pathIcons(item.weather.icon)} />
                                                <a-row justify="center" style="line-height: 1.5em">
                                                    <i class="icon min" />
                                                    <span class="span-temp">{item.temp.min.toFixed()}º</span>
                                                </a-row>
                                                <a-row justify="center" style="line-height: 1.5em">
                                                    <i class="icon max" />
                                                    <span class="span-temp">{item.temp.max.toFixed()}º</span>
                                                </a-row>
                                                <span style="text-transform: capitalize">{item.weather.description}</span>
                                            </a-space>
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