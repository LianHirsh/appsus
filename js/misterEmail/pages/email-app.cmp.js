import emailNavbar from '../cmps/email-navbar.cmp.js';

export default {
    template: `
        <section class="email-app container">
            <email-navbar class="sidebar"></email-navbar>
            <router-view class="main" :listType="listType"></router-view>
        </section>
    `,
    data() {
        return {
            listType: null
        }
    },
    watch: {
        '$route.params.type' () {
            this.listType = this.$route.params.type;
        }
    },
    created() {
        this.listType = this.$route.params.type;
    },
    components: {
        emailNavbar
    }
}