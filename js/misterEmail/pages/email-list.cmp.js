import { eventBus } from '../../mainApp/services/event-bus.service.js';
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
            <h2 v-if="isNoEmails"> No emails to display</h2>
        </section>
    `,
    props: ['listType', 'filterBy', 'sortBy'],
    data() {
        return {
            emails: [],
            isNoEmails: false
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
                        emailService.filterEmailsBySearch(this.filterBy, emails)
                            .then(filteredEmails => {
                                this.emails = filteredEmails;
                                this.isNoEmails = (this.emails.length === 0) ? true : false;
                            });
                    } else {
                        this.emails = emails;
                        this.isNoEmails = (this.emails.length === 0) ? true : false;
                    }
                });
        },
        changeReadStatus(emailId) {
            emailService.changeIsReadStatus(emailId, false);
            this.updateUnreadCountEmails();
        },
        changeRead(emailId) {
            emailService.changeIsReadStatus(emailId, true);
            this.updateUnreadCountEmails();
        },
        getSortedEmails() {
            emailService.getSortedEmails(this.sortBy)
                .then(emails => {
                    this.emails = emails;
                });
        },
        updateUnreadCountEmails() {
            emailService.getUnreadCountEmails()
                .then(res => {
                    const unreadCount = res;
                    eventBus.$emit('countChange', unreadCount);
                });
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
            this.getSortedEmails();
        }
    },
    created() {
        this.getEmails();
        this.updateUnreadCountEmails();
    },
    components: {
        emailPreview
    }
}