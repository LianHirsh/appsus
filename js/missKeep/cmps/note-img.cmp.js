export default {
    template: `
        <section class="note-img">
            <div class="note-img-content"> 
                <img :src="info.url" title="info.title"/>
            </div>
            <div>
                <div class="toolbar"></div>
                <span class="far fa-image visible"></span>
            </div>
        </section>
    `,
    props: ['info']
}