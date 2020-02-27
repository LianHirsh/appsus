export default {
    template: `
    <section class="side-navbar">
         <nav class="flex column">
            <router-link to="/emailApp/compose" exact>
                Compose
            </router-link>
            <router-link to="/emailApp/emailList/inbox" exact>
                Inbox
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
    `
}