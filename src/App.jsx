import logoVue from './assets/logo.png'

import Weather from './components/Weather'


export default {

    render() {

        return (
            <div id="main">
                <h1>A simple weather app with vue3</h1>
                <img src={logoVue} alt='img' />
                <Weather />
            </div>
        )
    }
}