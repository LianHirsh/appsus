import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';

export default {
    template: `
        <section class="email-app">
            <email-list :emails="emails" @removed="removeEmail"></email-list>
        </section>
    `,
    data() {
        return {
            emails: []
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId);
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            })
    },
    components: {
        emailList
    }
}