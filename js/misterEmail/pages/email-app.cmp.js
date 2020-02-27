import emailNavbar from '../cmps/email-navbar.cmp.js';
import filterEmails from '../cmps/email-filter.cmp.js';
import sortEmails from '../cmps/email-sort.cmp.js';

export default {
    template: `
        <section class="email-app container">
            <email-navbar class="sidebar"></email-navbar>
            <filter-emails class="filter" @filterByRead="filterEmails" 
            @filterByText="filterEmails">
            </filter-emails>
            <sort-emails class="sort" @sort="sortEmails"></sort-emails>
            <router-view class="main" :listType="listType" :filterBy="filterBy" :sortBy="sortBy">
            </router-view>
        </section>
    `,
    data() {
        return {
            listType: null,
            filterBy: '',
            sortBy: ''
        }
    },
    methods: {
        filterEmails(filterBy) {
            this.filterBy = filterBy;
        },
        sortEmails(sortBy) {
            this.sortBy = sortBy;
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
        filterEmails,
        sortEmails
    }
}