import longText from '../../mainApp/cmps/long-text.cmp.js';

export default {
    template: `
        <section class="email-preview" @click="changeEmailStatus" :class="readState" v-if="email">
            <div v-if="isCloseState" class="closeEmail">
                <h2 class="from">{{email.from.name}}</h2>
                <h3 class="subject">{{email.subject}}</h3>
                <long-text :txt="email.body" :isCloseState="isCloseState"></long-text>
                <div class="sent-at">{{sentAt}}</div>
                <button class="star-email" @click.stop="$emit('stared', email.id)" 
                :class="starClass">
                    <span class="fas fa-star star"></span>
                </button>
                <button class="read-email" @click.stop="$emit('read', email.id)">
                    <span :class="envelope"></span>   
                </button>
            </div>
            <div v-else class="openEmail">
                <div class="preview-buttons">
                    <router-link class="open-email" :to="'/emailApp/'+email.id">
                        <img class="extend-img" src="imgs/extend.png"/>
                    </router-link>
                    <button class="delete-email" @click="$emit('removed', email.id)">
                        <span class="far fa-trash-alt trash"></span>
                    </button>
                    <button class="star-email" @click.stop="$emit('stared', email.id)" 
                    :class="starClass">
                        <span class="fas fa-star star"></span>
                    </button>
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