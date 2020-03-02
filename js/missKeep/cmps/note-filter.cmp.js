export default {
    template: `
        <section class="note-filter">
            <input class="search-txt" type="text" placeholder="Search Notes" v-model="filterByText"
            v-on:input="searchNoteByText">
            </input>
            <select class="filters" v-model="filterByType" v-on:change="searchNoteByType">
                <option>All</option>
                <option>Text</option>
                <option>Image</option>
                <option>Video</option>
                <option>List</option>
            </select>
        </section>
    `,
    data() {
        return {
            filterByText: '',
            filterByType: 'All'
        }
    },
    methods: {
        searchNoteByText() {
            this.$emit('filterByText', this.filterByText)
        },
        searchNoteByType() {
            this.$emit('filterByType', this.filterByType)
        }
    }
}