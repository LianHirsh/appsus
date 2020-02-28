export default {
    template: `
        <section class="note-video">
            <div class="note-video-content">
                <iframe class="video" :title="info.title" :src="'https://www.youtube.com/embed/'+info.urlYouTubeId">
                </iframe>
            </div>
            <div class="flex space-between">
                <span class="fab fa-youtube visible"></span>
                <div class="toolbar">
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                </div>
            </div>
        </section>
    `,
    props: ['info','id'],
    methods: {
        removeNote() {
            this.$emit('remove',this.id)
        }
    }
}
