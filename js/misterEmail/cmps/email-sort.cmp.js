export default {
    template: `
        <section class="email-sort">
            <span>Sort by:</span>
            <button @click="$emit('sort', 'title')">Title</button>
            <button @click="$emit('sort', 'date')">Date</button>
        </section>
    `
}