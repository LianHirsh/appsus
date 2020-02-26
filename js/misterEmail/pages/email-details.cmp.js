import { emailService } from '../../misterEmail/services/email.service.js';

export default {
    template: `
        <section class="email-details" v-if="email">
            <div class="preview-buttons">
                <button class="delete-email" @click="removeEmail"><img class="trash-img" src="imgs/trash.jpg"/></button>
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
            emailService.getEmailById(emailId)
                .then(email => {
                    this.email = email;
                    emailService.changeIsReadStatus(emailId);
                });
        },
        removeEmail() {
            emailService.removeEmail(this.email.id);
            this.$router.push('/emailApp/inbox');
        }
    },
    created() {
        this.getEmail();
    }
}