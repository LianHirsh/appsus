import { emailService } from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul class="list-preview">
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail" @removed="removeEmail"></email-preview>
                </li>
            </ul>
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
        emailPreview
    }
}