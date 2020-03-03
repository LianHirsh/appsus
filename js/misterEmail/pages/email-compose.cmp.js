import { eventBus } from '../../mainApp/services/event-bus.service.js';
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

                <input type="text"  placeholder="Subject:" v-model="email.subject"/>

                <textarea name="body" v-model="email.body"></textarea>

                <button class="send">Send</button>
            </form>
            </div>
            <button class="remove" @click="removeEmail"><span class="far fa-trash-alt trash"></span></button>
    </section>
    `,
    props: ['replyEmail'],
    data() {
        return {
            email: this.replyEmail || {}
        }
    },
    methods: {
        addEmail() {
            emailService.addEmail(this.email)
                .then((res) => {
                    emailService.changeSentStatus(res.id);
                    this.$router.push('/emailApp/emailList/sentMail');
                })
        },
        removeEmail() {
            emailService.addEmail(this.email)
                .then((res) => {
                    emailService.changeDraftStatus(res.id);
                    this.$router.push('/emailApp/emailList/drafts');
                })
        }
    }
}