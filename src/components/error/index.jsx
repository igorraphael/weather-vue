import { defineComponent, toRefs } from 'vue'
import sadSvg from '../../assets/sad.svg'
import './index.css'

export default defineComponent({

    name: 'Error',
    props: {

        message: { Type: String, required: false }
    },
    setup(props) {

        const { message } = toRefs(props)
    },
    render() {
        return (
            <div class="error-block">
                <div class="error-content">
                    <h1 class="error-msg">SORRY,</h1>
                    <h1 class="error-msg">ERROR 404</h1>
                    <img class="error-img" src={sadSvg} />
                    <p>{this.message}</p>
                </div>
            </div>
        )
    }
})