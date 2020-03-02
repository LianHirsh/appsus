export default {
    template: `
        <section class="app-header">
            <div class="screen" @click="toggleMenu" :class="{'open-menu-screen':isMenuOpen}"></div>
            <div class="header-container flex space-between align-center container">
                <router-link class="logo" :to="'/'"> Appsus</router-link>
                <nav>
                    <div @click="toggleMenu" class="menu-btn">x</div>
                    <div class="main-nav" :class="{'open-menu':isMenuOpen}">
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
                    </div>
                </nav>
            </div>
        </section>
    `,
    data() {
        return {
            isMenuOpen: false
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    }
}