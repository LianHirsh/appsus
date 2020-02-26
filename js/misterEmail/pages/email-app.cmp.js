import emailNavbar from '../cmps/email-navbar.cmp.js';

export default {
    template: `
        <section class="email-app">
            <email-navbar></email-navbar>
            <router-view></router-view>
        </section>
    `,
    components: {
        emailNavbar
    }
}