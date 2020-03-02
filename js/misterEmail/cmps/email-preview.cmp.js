import longText from '../../mainApp/cmps/long-text.cmp.js';

export default {
    template: `
        <section class="email-preview" @click="changeEmailStatus" :class="readState" v-if="email">
            <div class="close-email flex">
                <div class="data flex">
                    <button class="star-email" @click.stop="$emit('stared', email.id)" 
                    :class="starClass">
                        <span class="fas fa-star star"></span>
                    </button>
                    <h2 class="from">{{email.from.name}}</h2>
                    <h3 class="subject">{{email.subject}}</h3>
                </div>
                <div class="flex">
                <div class="sent-at">{{sentAt}}</div>
                    <button class="read-email" @click.stop="$emit('read', email.id)">
                        <span :class="envelope"></span>   
                    </button>
                </div>
            </div>
            <div v-if="!isCloseState" class="open-email flex">
                <div class="preview-buttons">
                    <router-link class="open-email-btn" :to="'/emailApp/'+email.id">
                        <img class="extend-img" src="imgs/extend.png"/>
                    </router-link>
                    <button class="delete-email" @click="$emit('removed', email.id)">
                        <span class="far fa-trash-alt trash"></span>
                    </button>
                </div>
                <div class="mail-info">
                    <h3 class="address">{{emailAddress}}</h3>
                    <long-text :txt="email.body" :isCloseState="!isCloseState"></long-text>
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
                return 'not-read';
            }
        },
        starClass() {
            if (this.email.isStar) {
                return 'yellow-star';
            } else {
                return 'white-star';
            }
        },
        envelope() {
            if (this.email.isRead) {
                return 'far fa-envelope-open envelope';
            } else {
                return 'far fa-envelope envelope';
            }
        },
        emailAddress() {
            return `<${this.email.from.address}>`
        }
    },
    methods: {
        changeEmailStatus() {
            this.isCloseState = !this.isCloseState;
            if (!this.email.isRead && !this.isCloseState) {
                this.$emit('read-open', this.email.id)
            }
        },
        padTime(time) {
            return (time < 10) ? '0' + time : time;
        }
    },
    components: {
        longText
    }
}