import loadingSVG from '@/assets/loading-white.svg'
import { defineComponent, onBeforeMount, reactive, ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
import Error from '../error'
import pathIcons from './iconsPath'
import './index.less'

export default defineComponent({

    name: 'Weather',

    setup(props, { emit }) {

        let currentHours = ref('')
        setInterval(() => currentHours.value = new Date().toString().substr(16, 5), 1000) //substr(16, 5) HH:mm

        const URL_API = (lat, lon) => `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=ea51c9a4b740d49ce7b1682daea3d231`

        const wData = reactive({

            nameCity: '',
            humidity: 0,
            temp: 0,
            wind: 0,
            clouds: 0,
            weather: {},
        })

        const errorMsg = ref('')

        let loading = ref(true)

        onBeforeMount(() => {

            setTimeout(() => {

                getLocation().then(position => {

                    // loading.value = true

                    const { latitude, longitude } = position.coords

                    emit('coords', { lat: latitude, lon: longitude })

                    fetch(URL_API(latitude, longitude)).then(response => response.json()).then(data => {

                        const { main, name, wind, clouds, weather } = data

                        wData.nameCity = name
                        wData.humidity = main.humidity
                        wData.clouds = clouds.all
                        wData.temp = Math.round(main.temp)
                        wData.wind = wind.speed * 3.6
                        wData.weather = weather[0]

                    }).catch(err => {

                        console.log(err)

                    }).finally(() => loading.value = false)

                }).catch(e => errorMsg.value = e.message)
            }, 2000)
        })

        async function getLocation() {

            return new Promise((resolve, reject) => {

                if (!("geolocation" in navigator)) {
                    reject(new Error('Geolocation is not available.'));
                }

                navigator.geolocation.getCurrentPosition(pos => {
                    resolve(pos);
                }, err => {
                    reject(err);
                });

            });
        }


        return {

            currentHours,
            wData,
            loading,
            errorMsg
        }
    },
    render() {

        const iconProps = {

            src: this.wData.weather.icon ? pathIcons(this.wData.weather.icon) : '',
            width: '8.5em',
            height: '8.5em'
        }

        return (
            <div class="card-w" onClick={() => this.$emit('handleClick', this.wData.nameCity)}>
                <a-spin spinning={this.loading} v-slots={{
                    indicator: () => <span class="indicator-loading"><InlineSvg src={loadingSVG} /></span>
                }}>
                    <div class="card-content">
                        <div class="card-header">
                            <span class="city">{this.wData.nameCity}</span>
                            <span class="hours">{this.currentHours}</span>
                        </div>
                        <div class="card-body">

                            <InlineSvg {...iconProps} class="icon-animated" />

                            <span class="current">{this.wData.weather ? this.wData.weather.description : '...'}</span>
                        </div>
                        <div class="card-footer">
                            <div class="data">
                                <span class="w-row">
                                    <i class="icon wind" />
                                    <span>{this.wData.wind ? Number.parseFloat(this.wData.wind).toPrecision(2) : '0'} km/h</span>
                                </span>
                                <span class="w-row">
                                    <i class="icon humidity" />
                                    <span class="mr-1">{this.wData.humidity ? this.wData.humidity : '0'} %</span>
                                </span>
                                <span class="w-row">
                                    <i class="icon clouds" />
                                    <span class="mr-1">{this.wData.clouds ? this.wData.clouds : '0'} %</span>
                                </span>
                            </div>
                            <div class="degrees">
                                <span>{this.wData.temp ? this.wData.temp : '0'}º</span>
                            </div>
                        </div>
                    </div>
                </a-spin>
            </div>
        )
    }
})