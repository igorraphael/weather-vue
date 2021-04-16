import Weather from './components/weather'
import './index.css'

export default {

    setup() {


        console.log('API_KEY ', process.env.API_KEY);
        console.log(process.env);
        console.log('meta-> ', import.meta.env);
    },
    render() {

        return (
            <div id="main">
                <h1>A simple weather app with vue3</h1>
                <Weather />
            </div>
        )
    }
}