import longText from '../../mainApp/cmps/long-text.cmp.js';

export default {
    template: `
        <section class="email-preview" @click="changeEmailStatus" :class="readState">
            <div v-if="isCloseState" class="closeEmail">
            <button class="star-email" @click.stop="$emit('stared', email.id)" :class="starClass">{{star}}</button>
                <h2 class="from">{{email.from.name}}</h2>
                <h3 class="subject">{{email.subject}}</h3>
                <long-text :txt="email.body" :isCloseState="isCloseState"></long-text>
                <div class="sent-at">{{sentAt}}</div>
            </div>
            <div v-else class="openEmail">
                <div class="preview-buttons">
                    <router-link class="open-email" :to="'/emailApp/'+email.id"><img class="extend-img" src="imgs/extend.png"/></router-link>
                    <button class="delete-email" @click="$emit('removed', email.id)"><img class="trash-img" src="imgs/trash.jpg"/></button>
                    <button class="star-email" @click.stop="$emit('stared', email.id)" :class="starClass">{{star}}</button>
                </div>
                <div class="mail-info">
                    <h2 class="from">{{email.from.name}}</h2>
                    <h3 class="address">{{email.from.address}}</h3>
                    <h3 class="subject">{{email.subject}}</h3>
                    <long-text :txt="email.body" :isCloseState="isCloseState"></long-text>
                    <div class="sent-at">{{sentAt}}</div>
                </div>
            </div>  
        </section>
    `,
    props: ['email'],
    data() {
        return {
            isCloseState: true
        }
    },
    computed: {
        sentAt() {
            let time = new Date(this.email.sentAt);
            const hours = this.padTime(time.getHours());
            const minutes = this.padTime(time.getMinutes());
            time = `${hours}:${minutes}`;

            return time;
        },
        readState() {
            if (this.email.isRead) {
                return 'read';
            } else {
                return 'notRead';
            }
        },
        star() {
            if (this.email.isStar) {
                return '⭐';
            } else {
                return '✰';
            }
        },
        starClass() {
            if (this.email.isStar) {
                return 'yellow-star';
            } else {
                return 'white-star';
            }
        }
    },
    methods: {
        changeEmailStatus() {
            this.isCloseState = !this.isCloseState;
        },
        padTime(time) {
            return (time < 10) ? '0' + time : time;
        }
    },
    components: {
        longText
    }
}