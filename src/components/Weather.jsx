import { defineComponent } from 'vue'
import './index.css'
import dayAnimate from '../assets/day.svg'


export default defineComponent({

    name: 'Weather',

    render() {
        return (
            <div class="container-w">
                <div class="content-w">
                    <div class="w-header">
                        <span class="w-city">Ivaiporã</span>
                        <span class="w-hours">10:00</span>
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
                                <span style={{ marginRight: '1.5em' }}>90 %</span>
                            </span>
                            <span class="w-info-row">
                                <i class="wi wi-sunny" />
                                <span style={{ marginRight: '2.5em' }}>0h</span>
                            </span>
                        </div>
                        <div class="w-degrees">
                            <span>23 º</span>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
})