import { defineComponent, ref, reactive, onMounted } from 'vue'
import iconLoading from '@/assets/loading.svg'
import Error from '../error'
import './index.less'


export default defineComponent({

    name: 'Whater',
    setup() {

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

        const loading = ref(true)

        onMounted(() => {

            getLocation().then(position => {

                // loading.value = true

                const { latitude, longitude } = position.coords

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

        return (
            <div class="card-w">
                <div class="card-content">
                    {this.errorMsg && <Error message={this.errorMsg} />}

                    {this.loading && !this.errorMsg && (
                        <div class="content-loading">
                            <img src={iconLoading} class="loading" />
                        </div>
                    )}

                    <div v-show={!this.loading && !this.errorMsg}>
                        <div class="card-header">
                            <span class="city">{this.wData.nameCity}</span>
                            <span class="hours">{this.currentHours}</span>
                        </div>
                        <div class="card-body">
                            {
                                this.wData.weather.icon ? (<i class={`icon-animated iop-${this.wData.weather.icon}`} />) : ''
                            }
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
                </div>
            </div>
        )
    }
})