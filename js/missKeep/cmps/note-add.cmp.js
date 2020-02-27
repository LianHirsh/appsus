export default {
    template: `
    <section class="note-add flex space-between">
        <input 
        type="text"
        autocomplete=off
        placeholder="What's on your mind..."
        />

        <div class="icons flex">
            <span class="fas fa-font fa-lg selected"></span>
            <span class="far fa-image fa-lg"></span>
            <span class="fab fa-youtube fa-lg"></span>
            <span class="fas fa-list fa-lg"></span>
        </div>
    </section>
    `
}