export default {
    template: `
        <section class="note-video">
            <div class="note-video-content">
                <iframe class="video" :title="info.title" :src="'https://www.youtube.com/embed/'+info.urlYouTubeId">
                </iframe>
            </div>
            <div>
                <div class="toolbar"></div>
                <span class="fab fa-youtube visible"></span>
            </div>
        </section>
    `,
    props: ['info']
}