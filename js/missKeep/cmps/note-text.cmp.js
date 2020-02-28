export default {
    template: `
        <section class="note-text">
            <div v-if="info" class="note-text-content">
                <p>{{info.text}}</p>
                {{idx}}
            </div>
            <div class="flex space-between">
                <span class="fas fa-font visible"></span>
                <div class="toolbar">
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                </div>
            </div>
        </section>
    `,
    props: ['info','idx'],
    methods: {
        removeNote() {
            this.$emit('remove')
        }
    }
}