export default {
    template: `
        <section class="note-img">
            <div class="note-img-content"> 
                <img :src="img.info.url" title="img.info.title"/>
            </div>
            <div class="flex">
                <div class="toolbar"><div>
                <span class="far fa-image visible"></span>
            </div>
        </section>
    `,
    props: ['img']
}