import emailNavbar from '../cmps/email-navbar.cmp.js';

export default {
    template: `
        <section class="email-app container">
            <email-navbar class="sidebar"></email-navbar>
            <router-view class="main"></router-view>
        </section>
    `,
    components: {
        emailNavbar
    }
}