import { emailService } from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul class="list-preview" v-if="emails">
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail" @read="changeRead" @removed="removeEmail" @stared="changeStar"></email-preview>
                </li>
            </ul>
        </section>
    `,
    props: ['listType', 'filterBy'],
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
            this.getEmails();
        },
        getEmails() {
            emailService.query(this.listType)
                .then(emails => {
                    if (this.filterBy) {
                        emailService.filterEmailsBySearch(this.filterBy)
                            .then(filteredEmails => {
                                this.emails = filteredEmails;
                                console.log(filteredEmails)
                            });
                    } else {
                        this.emails = emails;
                    }
                });
        },
        changeRead(emailId) {
            emailService.changeIsReadStatus(emailId, false);
        }
    },
    watch: {
        'listType' () {
            this.getEmails();
        },
        'filterBy' () {
            console.log(this.filterBy)
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