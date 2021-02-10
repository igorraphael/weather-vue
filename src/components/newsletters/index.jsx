import { defineComponent } from 'vue'
import Avatar from '@/assets/avatar.jpg'

import './index.less'

const tweets = [
    {
        id: 1,
        name: 'user256',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun lorem ipsun lorem..'
    },
    {
        id: 2,
        name: 'Iasd5',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
    {
        id: 3,
        name: 'fr0st_88',
        tweet: 'Lorem ipsun lorem ipsun lorem ipsun'
    },
];

export default defineComponent({

    name: 'Newsletters',

    render() {

        return (
            <div class="newsletter">
                <div class="tt-feed">
                    <div class="tt-header">
                        <h2>Twitter Feed</h2>
                        <span>#City</span>
                    </div>

                    <div class="tt-content">
                        <ul class="tt-list">
                            {tweets.map((item, index) => (

                                <li key={index} class="item">
                                    <img class="avatar" src={Avatar} onError={(e) => console.log(e)} />
                                    <span class="tweet">
                                        <span class="tweet-user">@{item.name}</span>

                                        <span class="tweet-data">{item.tweet}</span>
                                    </span>

                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div class="week-data">
                    <div class="card-days">
                        <h2 class="day-week">SEG</h2>
                        <i class="icon sun" />
                        <span class="degress">9 º</span>
                        <span>SOL</span>
                    </div>
                    <div class="card-days">
                        <h2 class="day-week">TER</h2>
                        <i class="icon sun" />
                        <span class="degress">12 º</span>
                        <span>CHUVA</span>
                    </div>
                    <div class="card-days">
                        <h2 class="day-week">QUA</h2>
                        <i class="icon sun" />
                        <span class="degress">26 º</span>
                        <span>TEMPESTADE</span>
                    </div>
                    <div class="card-days">
                        <h2 class="day-week">QUI</h2>
                        <i class="icon sun" />
                        <span class="degress">7 º</span>
                        <span>CHUVA FORTE</span>
                    </div>
                    <div class="card-days">
                        <h2 class="day-week">SEX</h2>
                        <i class="icon sun" />
                        <span class="degress">21 º</span>
                        <span>VODKA</span>
                    </div>
                </div>
            </div >
        )
    }
})