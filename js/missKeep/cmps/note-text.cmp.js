export default {
    template: `
        <section class="note-text">
            <div v-if="info" class="note-text-content">
                <p>{{info.text}}</p>
            </div>
            <div class="flex space-between">
                <span class="fas fa-font visible"></span>
                <div class="toolbar">
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>
        </section>
    `,
    props: ['info', 'id'],
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
        }
    }
}