import d1 from '@/assets/openweathermap/01d.svg'
import n1 from '@/assets/openweathermap/01n.svg'
import d2 from '@/assets/openweathermap/02d.svg'
import n2 from '@/assets/openweathermap/02n.svg'
import d3 from '@/assets/openweathermap/03d.svg'
import n3 from '@/assets/openweathermap/03n.svg'
import d4 from '@/assets/openweathermap/04d.svg'
import n4 from '@/assets/openweathermap/04n.svg'
import d9 from '@/assets/openweathermap/09d.svg'
import n9 from '@/assets/openweathermap/09n.svg'
import d10 from '@/assets/openweathermap/10d.svg'
import n10 from '@/assets/openweathermap/10n.svg'
import d11 from '@/assets/openweathermap/11d.svg'
import n11 from '@/assets/openweathermap/11n.svg'
import d13 from '@/assets/openweathermap/13d.svg'
import n13 from '@/assets/openweathermap/13n.svg'
import d50 from '@/assets/openweathermap/50d.svg'
import n50 from '@/assets/openweathermap/50n.svg'

const pathIcon = (code) => {

    return {

        '01d': d1,
        '01n': n1,
        '02d': d2,
        '02n': n2,
        '03d': d3,
        '03n': n3,
        '04d': d4,
        '04n': n4,
        '09d': d9,
        '09n': n9,
        '10d': d10,
        '10n': n10,
        '11d': d11,
        '11n': n11,
        '13d': d13,
        '13n': n13,
        '50d': d50,
        '50n': n50,
    }[code]
}

export default pathIcon