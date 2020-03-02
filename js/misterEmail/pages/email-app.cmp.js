import emailNavbar from '../cmps/email-navbar.cmp.js';
import filterEmails from '../cmps/email-filter.cmp.js';
import sortEmails from '../cmps/email-sort.cmp.js';

export default {
    template: `
        <section class="email-app container">
            <filter-emails v-if="listType" class="filter" @filterByRead="filterEmails" 
            @filterByText="filterEmails">
            </filter-emails>
            <sort-emails  v-if="listType" class="sort" @sort="sortEmails"></sort-emails>
            <email-navbar class="sidebar"></email-navbar>
            <router-view class="main" :listType="listType" :filterBy="filterBy" :sortBy="sortBy"
            @reply="updateEmail" :replyEmail="replyEmail">
            </router-view>
        </section>
    `,
    data() {
        return {
            listType: null,
            filterBy: '',
            sortBy: '',
            replyEmail: null
        }
    },
    methods: {
        filterEmails(filterBy) {
            this.filterBy = filterBy;
        },
        sortEmails(sortBy) {
            this.sortBy = sortBy;
        },
        updateEmail(email) {
            this.replyEmail = JSON.parse(JSON.stringify(email));
            this.$router.push('/emailApp/compose');
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