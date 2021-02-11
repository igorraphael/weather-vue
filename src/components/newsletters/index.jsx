import { defineComponent } from 'vue'
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
    render() {

        return (
            <a-row gutter={[48, 48]} class="newsletter">
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
                                    title: () => <a href="#">@{item.username}</a>,
                                    avatar: () => <img class="avatar" src={Avatar} onError={(e) => console.log(e)} />
                                }}
                                    description={`${item.tweet}`}
                                />
                            </a-list-item>
                        )}
                    />
                </a-col>
                <a-col {...{ sm: 24, md: 24, lg: 24, xl: 16 }} style="padding: 24px 0 ">
                    <a-list
                        class="week-days"
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={days}
                        renderItem={({ item }) => (

                            <a-list-item>
                                <a-card class="card-day">
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
        )
    }
})