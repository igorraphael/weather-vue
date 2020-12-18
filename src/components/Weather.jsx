import { defineComponent, ref } from 'vue'
import './index.css'
import dayAnimate from '../assets/day.svg'

export default defineComponent({

    name: 'Weather',

    setup() {

        let currentHours = ref('')

        //substr(16, 5) HH:mm
        setInterval(() => currentHours.value = new Date().toString().substr(16, 8), 1000)

        const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=-24.2539782&lon=-51.672899099999995&units=metric&appid=ea51c9a4b740d49ce7b1682daea3d231';

        const weather = ref({
            nameCity: '',
            humidity: 0,
            temp: 0,

        })

        fetch(URL).then(response => {

            return response.json()
        }).then(data => {
            // console.log('data ->', data)
            const { main, name, wind } = data

            weather.nameCity = name
            weather.humidity = main.humidity
            weather.temp = Math.round(main.temp)
        })

        return () => (

            <div class="container-w">
                <div class="content-w">
                    <div class="w-header">
                        <span class="w-city">{weather.nameCity}</span>
                        <span class="w-hours">{currentHours.value}</span>
                    </div>
                    <div class="w-body">
                        <img class="w-icon-img" src={dayAnimate} />
                        <span class="w-text-weather">Sol</span>
                    </div>
                    <div class="w-info">
                        <div>
                            <span class="w-info-row">
                                <i class="wi wi-wind" />
                                <span>21 km/h</span>
                            </span>
                            <span class="w-info-row">
                                <i class="wi wi-humidity" />
                                <span style={{ marginRight: '1.7em' }}>{weather.humidity} %</span>
                            </span>
                            <span class="w-info-row">
                                <i class="wi wi-sunny" />
                                <span style={{ marginRight: '2.5em' }}>0h</span>
                            </span>
                        </div>
                        <div class="w-degrees">
                            <span>{weather.temp} º</span>
                            {/* <span>26 º</span> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    },
})