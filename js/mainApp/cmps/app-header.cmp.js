export default {
    template: `
        <section class="app-header">
            <div class="header-container flex space-between align-center container">
                <span class="logo">Appsus</span>
                <nav>
                    <router-link to="/" class="link" exact>
                        Home
                    </router-link>
                    <router-link to="/about" class="link" exact>
                        About
                    </router-link>
                    <router-link to="/noteApp" class="link" exact>
                        MissKeep
                    </router-link>
                    <router-link to="/emailApp/emailList/inbox" class="link" exact>
                        MisterEmail
                    </router-link>
                </nav>
            </div>
        </section>
    `
}