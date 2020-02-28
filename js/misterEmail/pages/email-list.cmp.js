import { emailService } from '../services/email.service.js';
import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul class="list-preview" v-if="emails">
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail" @read="changeReadStatus" @removed="removeEmail" 
                    @stared="changeStar" @read-open="changeRead"></email-preview>
                </li>
            </ul>
        </section>
    `,
    props: ['listType', 'filterBy', 'sortBy'],
    data() {
        return {
            emails: []
        }
    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId);
            this.getEmails();
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
        changeReadStatus(emailId) {
            emailService.changeIsReadStatus(emailId, false);
        },
        changeRead(emailId) {
            emailService.changeIsReadStatus(emailId, true);
        }
    },
    watch: {
        'listType' () {
            this.getEmails();
        },
        'filterBy' () {
            this.getEmails();
        },
        'sortBy' () {
            console.log('todo', this.sortBy);
        }
    },
    created() {
        this.getEmails();
    },
    components: {
        emailPreview
    }
}