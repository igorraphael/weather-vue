import Weather from './components/weather'
import './index.css'

export default {

    setup() {


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