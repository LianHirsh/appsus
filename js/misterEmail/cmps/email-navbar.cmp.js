import emailStatus from '../cmps/email-status.cmp.js';

export default {
    template: `
    <section class="side-navbar">
    <button class="toggle-menu">☰</button>
         <nav class="flex column">
            <router-link to="/emailApp/compose" class="compose" exact>
                <span class="fas fa-plus"></span>
                Compose
            </router-link>
            <router-link to="/emailApp/emailList/inbox" class="flex" exact>
                <span class="fas fa-inbox"></span>
                <div>Inbox &nbsp</div>
                <email-status class="unreadCount"></email-status>
            </router-link>
            <router-link to="/emailApp/emailList/starred" exact>
                <span class="fas fa-star"></span>
                Starred
            </router-link>
            <router-link to="/emailApp/emailList/snoozed" exact>
                <span class="far fa-clock"></span>
                Snoozed
            </router-link>
            <router-link to="/emailApp/emailList/sentMail" exact>
                <span class="fas fa-share-square"></span>
                Sent Mail
            </router-link>
            <router-link to="/emailApp/emailList/drafts" exact>
                <span class="far fa-file"></span>
                Drafts
            </router-link> 
        </nav>

    </section>
    `,
    components: {
        emailStatus
    }
}