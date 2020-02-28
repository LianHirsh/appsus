export default {
    template: `
        <section class="note-img">
            <div class="note-img-content"> 
                <img :src="info.url" :title="info.title"/>
            </div>
            <div class="flex space-between">
                <span class="far fa-image visible"></span>
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