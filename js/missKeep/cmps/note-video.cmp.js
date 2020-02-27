export default {
    template: `
        <section class="note-video">
        <div class="note-video-content">
            <video width="200" height="150" controls>
                <source :src="video.info.url" title="video.info.title" type="video/mp4">
            </video>
        </div>
            <div class="flex">
                <span class="fab fa-youtube visible"></span>
                <div class="toolbar"></div>
            </div>
        </section>
    `,
     props: ['video']
}