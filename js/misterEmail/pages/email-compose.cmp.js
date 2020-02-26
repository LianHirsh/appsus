import { emailService } from '../services/email.service.js';

export default {
    template: `
    <section class="email-compose">
        <div class="form-msg flex column">
            <div class="form-title">New Message</div>

            <form class="flex column" @submit.prevent="addEmail">
                <input type="email" name="cc" placeholder="To:" v-model="email.to"/>

                <input type="email" name="bcc" placeholder="Cc:" v-model="email.cc" />

                <input type="email" name="to" placeholder="Bcc:" v-model="email.bcc" />

                <input type="text" name="subject" placeholder="Subject:" v-model="email.subject" />

                <textarea name="body" v-model="email.body"></textarea>

                <button>Send</button>
            </form>

            <button>Remove</button>
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
            emailService.addEmail(this.mail)
                .then(() => {
                    this.$router.push('/emailApp')
                })
        },
    }
}