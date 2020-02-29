export default {
    template: `
        <section class="email-sort">
            <span class="sort-title">Sort by:&nbsp</span>
            <button class="sort-by-title" @click="$emit('sort', 'title')">Title</button>
            <button class="sort-by-date" @click="$emit('sort', 'date')">Date</button>
        </section>
    `
}