import { emailService } from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul class="list-preview" v-if="emails">
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail" @removed="removeEmail" @stared="changeStar"></email-preview>
                </li>
            </ul>
        </section>
    `,
    props: ['listType'],
    data() {
        return {
            emails: []
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId);
        },
        changeStar(emailId) {
            emailService.changeStare(emailId);
        },
        getEmails() {
            emailService.query(this.listType)
                .then(emails => {
                    this.emails = emails;
                });
        }
    },
    watch: {
        'listType' () {
            this.getEmails();
        }
    },
    created() {
        this.getEmails();
    },
    components: {
        emailPreview
    }
}