export default {
    template: `
        <section class="note-text">
            <div class="note-text-content">
                <p>{{info.text}}</p>
            </div>
            <div>
                <span class="fas fa-font visible"></span>
                <div class="toolbar"></div>
            </div>
        </section>
    `,
    props: ['info']
}