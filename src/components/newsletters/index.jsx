import { defineComponent, ref } from 'vue'
import Avatar from '@/assets/avatar.jpg'
import './index.less'

const tweets = [
    {
        id: 1,
        username: 'user256',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem..'
    },
    {
        id: 2,
        username: 'Iasd5',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
    {
        id: 3,
        username: 'fr0st_88',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
];

const days = [
    {
        id: 1,
        dia: 'SEG',
        grau: 24,
        label: 'SOL'
    },
    {
        id: 2,
        dia: 'TER',
        grau: 15,
        label: 'CHUVA'
    },
    {
        id: 3,
        dia: 'QUA',
        grau: 20,
        label: 'NUBALDO'
    },
    {
        id: 4,
        dia: 'QUI',
        grau: 26,
        label: 'SOL'
    },
];

export default defineComponent({

    name: 'Newsletters',

    setup() {

        const hasCity = ref(false)

        return {

            hasCity
        }
    },
    render() {

        return (
            <>
                {!this.hasCity ?
                    <a-row class="block-init">
                        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 24 }}>
                            <h1>Welcome!</h1>
                            <p>xWeather is a simple application of weather with base your location and some tweets about your place.</p>
                            <p>This app is development, for more information check the repository in <a href="#" target="_blank">Github</a>.</p>
                        </a-col>
                    </a-row>
                    :
                    <a-row class="newsletter">
                        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 8 }} class="tt-feed">
                            <div class="tt-header">
                                <h2>Twitter Feed</h2>
                                <span>#City</span>
                            </div>
                            <a-list
                                class="tt-content"
                                dataSource={tweets}
                                renderItem={({ item }) => (
                                    <a-list-item key={item.id}>
                                        <a-list-item-meta v-slots={{
                                            title: () => <a href="#" class="tt-username">@{item.username}</a>,
                                            avatar: () => <img class="avatar" src={Avatar} onError={(e) => console.log(e)} />
                                        }}
                                            description={`${item.tweet}`}
                                        />
                                    </a-list-item>
                                )}
                            />
                        </a-col>
                        <a-col {...{ sm: 24, md: 24, lg: 24, xl: 16 }} style="padding: 18px">
                            <a-list
                                class="week-days"
                                grid={{ gutter: 16, column: 4 }}
                                dataSource={days}
                                renderItem={({ item }) => (

                                    <a-list-item>
                                        <a-card class="card-day" bordered={false}>
                                            <h2 class="day-week">{item.dia}</h2>
                                            <i class="icon sun" />
                                            <span>{item.grau} º</span>
                                            <span>{item.label}</span>
                                        </a-card>
                                    </a-list-item>
                                )}
                            />
                        </a-col>
                    </a-row>
                }
            </>
        )
    }
})