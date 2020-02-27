import emailNavbar from '../cmps/email-navbar.cmp.js';
import FilterEmails from '../cmps/email-filter.cmp.js'

export default {
    template: `
        <section class="email-app container">
            <email-navbar class="sidebar"></email-navbar>
            <filter-emails class="filter" @filterByRead="filterEmails" @filterByText="filterEmails"></filter-emails>
            <router-view class="main" :listType="listType" :filterBy="filterBy"></router-view>
        </section>
    `,
    data() {
        return {
            listType: null,
            filterBy: ''
        }
    },
    methods: {
        filterEmails(filterBy) {
            this.filterBy = filterBy;
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
        emailNavbar,
        FilterEmails
    }
}