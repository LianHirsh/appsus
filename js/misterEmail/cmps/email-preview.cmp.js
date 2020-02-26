import longText from '../../mainApp/cmps/long-text.cmp.js'

export default {
    template: `
        <section class="email-preview" @click="changeEmailStatus">
            <h2>{{email.from.name}}</h2>
            <h3 v-if="!isCloseState">{{email.from.address}}</h3>
            <h3>{{email.subject}}</h3>
            <long-text :txt="email.body" :isCloseState="isCloseState"></long-text>
            <div>{{email.sentAt}}</div>
        </section>
    `,
    props: ['email'],
    data() {
        return {
            isCloseState: true
        }
    },
    methods: {
        changeEmailStatus() {
            this.isCloseState = !this.isCloseState;
        }
    },
    components: {
        longText
    }
}