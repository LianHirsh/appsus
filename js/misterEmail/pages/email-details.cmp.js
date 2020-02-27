import { emailService } from '../../misterEmail/services/email.service.js';

export default {
    template: `
        <section class="email-details" v-if="email">
            <div class="preview-buttons">
                <button class="delete-email" @click="removeEmail" title="Delete email">
                    <img class="trash-img" src="imgs/trash.jpg"/>
                </button>
                <button class="snoozed-email" @click="changeSnoozedStatus" 
                title="To further treatment">
                    <img class="clock-img" src="imgs/clock.png"/>
                </button>
                <button class="draft-email" @click="changeDraftStatus" title="To draft email">
                    <img class="paper-img" src="imgs/paper.png"/>
                </button>
            </div>
            <h2>{{email.subject}}</h2>
            <h3>{{email.from.name}}</h3>
            <h3>{{email.from.address}}</h3>
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
            console.log(emailId);
            emailService.getEmailById(emailId)
                .then(email => {
                    this.email = email;
                    emailService.changeIsReadStatus(emailId);
                });
        },
        removeEmail() {
            emailService.removeEmail(this.email.id);
            this.$router.push('/emailApp/inbox');
            this.email = null;
        },
        changeSnoozedStatus() {
            emailService.changeSnoozedStatus(this.email.id);
        },
        changeDraftStatus() {
            emailService.changeDraftStatus(this.email.id);
        }
    },
    created() {
        this.getEmail();
    }
}