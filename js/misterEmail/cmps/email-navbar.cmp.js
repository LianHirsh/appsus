import emailStatus from '../cmps/email-status.cmp.js';

export default {
    template: `
    <section class="side-navbar">
         <nav class="flex column">
            <router-link to="/emailApp/compose" exact>
                Compose
            </router-link>
            <router-link to="/emailApp/emailList/inbox" class="flex" exact>
                <div>Inbox &nbsp</div> <email-status class="unreadCount"></email-status>
            </router-link>
            <router-link to="/emailApp/emailList/starred" exact>
                Starred
            </router-link>
            <router-link to="/emailApp/emailList/snoozed" exact>
                Snoozed
            </router-link>
            <router-link to="/emailApp/emailList/sentMail" exact>
                Sent Mail
            </router-link>
            <router-link to="/emailApp/emailList/drafts" exact>
                Drafts
            </router-link>
        </nav>
    </section>
    `,
    components: {
        emailStatus
    }
}