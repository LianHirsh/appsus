import { emailService } from '../services/email.service.js';

export default {
    template: `
    <section class="email-compose">
        <div class="form-msg flex column">
            <div class="form-title">New Message</div>

            <form class="flex column" @submit.prevent="addEmail">
                <input type="email"  placeholder="To:"/>

                <input type="email"  placeholder="Cc:" v-model="email.cc" />

                <input type="email"  placeholder="Bcc:" />

                <input type="text"  placeholder="Subject:" v-model="email.subject" />

                <textarea name="body" v-model="email.body"></textarea>

                <button class="send">Send</button>
            </form>

            <button class="reset"><img class="reset-img" src="./imgs/trash.jpg"></button>
        </div>
    </section>
    `,
    data() {
        return {
            email: {}
        }
    },
    methods: {
        addEmail() {
            emailService.addEmail(this.email)
                .then(() => {
                    this.$router.push('/emailApp')
                })
        },
    }
}