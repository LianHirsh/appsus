export default {
    template: `
        <section class="email-filter">
            <input class="search-txt" type="text" placeholder="Search email" v-model="filterByText"
            v-on:input="searchEmailByText">
            </input>
            <select class="filters" v-model="filterByRead" v-on:change="searchEmailByReadStatus">
                <option>All</option>
                <option>Read</option>
                <option>Unread</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterByText: '',
            filterByRead: ''
        }
    },
    methods: {
        searchEmailByText() {
            this.$emit('filterByText', this.filterByText)
        },
        searchEmailByReadStatus() {
            this.$emit('filterByRead', this.filterByRead)
        }
    }
}