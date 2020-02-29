import { eventBus } from '../../mainApp/services/event-bus.service.js';
import { emailService } from '../../misterEmail/services/email.service.js';

export default {
    template: `
        <section class="email-details" v-if="email">
            <div class="details-buttons">
                <button class="delete-email" @click="removeEmail" title="Delete email">
                    <span class="far fa-trash-alt trash"></span>
                </button>
                <button class="snoozed-email" @click="changeSnoozedStatus" 
                title="To further treatment">
                    <span class="far fa-clock clock"></span>
                </button>
                <button class="draft-email" @click="changeDraftStatus" title="To draft email">
                    <span class="far fa-file file"></span>
                </button>
                <button class="reply-email" @click="replyEmail" title="Reply">
                    <span class="fas fa-share-square reply"></span>
                </button>
            </div>
            <h2 class="details-subject">{{email.subject}}</h2>
            <div class="email-from">
                <h3 class="email-from-name">{{email.from.name}}</h3>
                <h3 class="email-from-address"><{{email.from.address}}></h3>
            </div>
            <div>{{email.body}}</div>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.id;
            emailService.getEmailById(emailId)
                .then(email => {
                    this.email = email;
                });
        },
        removeEmail() {
            emailService.removeEmail(this.email.id);
            this.email = null;
            this.$router.push('/emailApp/emailList/inbox');
        },
        changeSnoozedStatus() {
            emailService.changeSnoozedStatus(this.email.id);
        },
        changeDraftStatus() {
            emailService.changeDraftStatus(this.email.id);
        },
        replyEmail() {
            this.$emit('reply', this.email);
        }
    },
    created() {
        this.getEmail();
    }
}