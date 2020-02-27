export default {
    template: `
        <section class="note-txt">
            <div class="note-txt-content">
                <p>{{text}}</p>
            </div>
            <div class="flex">
                <span class="fas fa-font visible"></span>
                <div class="toolbar"></div>
            </div>
        </section>
    `,
    props: ['text']
}