import { defineComponent, ref, onMounted } from 'vue'
import './index.css'

export default defineComponent({

    name: 'Weather',

    setup() {

        let currentHours = ref('')
        setInterval(() => currentHours.value = new Date().toString().substr(16, 8), 1000) //substr(16, 5) HH:mm
        // const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=-24.2539782&lon=-51.672899099999995&units=metric&appid=ea51c9a4b740d49ce7b1682daea3d231';
        const weatherApp = ref({

            nameCity: '',
            humidity: 0,
            temp: 0,
            wind: 0,
            clouds: 0,
            weather: {},
        })

        onMounted(() => {

            allowGeoLocation().then(coords => {

                let urlApi = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=metric&lang=pt_br&appid=ea51c9a4b740d49ce7b1682daea3d231`

                fetch(urlApi).then(response => {

                    return response.json()
                }).then(data => {
                    // console.log('WEATHER', data)
                    const { main, name, wind, clouds, weather } = data

                    weatherApp.nameCity = name
                    weatherApp.humidity = main.humidity
                    weatherApp.clouds = clouds.all
                    weatherApp.temp = Math.round(main.temp)
                    weatherApp.wind = wind.speed * 3.6
                    weatherApp.weather = weather[0]

                }).catch(err => {

                    return new Error('Sorry, error in api openweather..')
                })

            }).catch(error => {

                console.log('err', error)
            })
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

        async function allowGeoLocation() {
            try {

                const position = await getLocation();
                return [position.coords.latitude, position.coords.longitude]

            } catch (error) {

                console.log(error)//if error in geolocation.
                return error
            }
        }

        return () => (

            <div class="container-w">
                <div class="content-w">
                    <div class="w-header">
                        <span class="w-city">{weatherApp.nameCity}</span>
                        <span class="w-hours">{currentHours.value}</span>
                    </div>
                    <div class="w-body">
                        {
                            weatherApp.weather ? (<img class="w-icon-img" src={`./src/assets/openweathermap/${weatherApp.weather.icon}.svg`} />) : ''
                        }
                        <span class="w-text-weather">{weatherApp.weather ? weatherApp.weather.description : '...'}</span>
                    </div>
                    <div class="w-info">
                        <div>
                            <span class="w-info-row">
                                <i class="wi wi-wind" />
                                <span>{weatherApp.wind ? Number.parseFloat(weatherApp.wind).toPrecision(2) : '0'} km/h</span>
                            </span>
                            <span class="w-info-row">
                                <i class="wi wi-humidity" />
                                <span style={{ marginRight: '1.7em' }}>{weatherApp.humidity ? weatherApp.humidity : '0'} %</span>
                            </span>
                            <span class="w-info-row">
                                <i class="wi wi-clouds" />
                                <span style={{ marginRight: '1.7em' }}>{weatherApp.clouds ? weatherApp.clouds : '0'} %</span>
                            </span>
                        </div>
                        <div class="w-degrees">
                            <span>{weatherApp.temp ? weatherApp.temp : '0'}º</span>
                            {/* <i class="wi wi-celsius" /> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})