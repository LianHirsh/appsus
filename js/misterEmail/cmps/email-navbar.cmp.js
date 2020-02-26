export default {
    template: `
    <section class="side-navbar">
         <nav class="flex column">
            <router-link to="/emailApp/compose" exact>
                Compose
            </router-link>
            <router-link to="/emailApp/inbox" exact>
                Inbox
            </router-link>
            <router-link to="/emailApp/starred" exact>
                Starred
            </router-link>
            <router-link to="/emailApp/snoozed" exact>
                Snoozed
            </router-link>
            <router-link to="/emailApp/sentMail" exact>
                Sent Mail
            </router-link>
            <router-link to="/emailApp/drafts" exact>
                Drafts
            </router-link>
        </nav>
    </section>
    `
}