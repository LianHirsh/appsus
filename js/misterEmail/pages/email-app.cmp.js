import { emailService } from '../services/email.service.js';
import emailList from '../cmps/email-list.cmp.js';
import emailNavbar from '../cmps/email-navbar.cmp.js';

export default {
    template: `
        <section class="email-app">
            <email-navbar></email-navbar>
            <router-view></router-view>
            <email-list :emails="emails"></email-list>
        </section>
    `,
    data() {
        return {
            emails: []
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            })
    },
    components: {
        emailList,
        emailNavbar
    }
}