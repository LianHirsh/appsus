export default {
    template: `
        <section class="note-text">
            <div v-if="info" class="note-text-content">
                <p>{{info.text}}</p>
            </div>
            <div class="flex space-between">
                <span class="fas fa-font visible"></span>
                <div class="toolbar">
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                </div>
            </div>

            <section v-if="isEdit">
                <input
                v-model="newText"
                type="text"
                autocomplete=off
                />
                <button @click="updateNote">Update</button>
                <button @click="editNote">Cancel</button>
            </section>
            
        </section>
    `,
    props: ['info','id'],
    data() {
        return {
            isEdit: false,
            newText: this.info.text
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove',this.id)
        },
        editNote() {
            this.isEdit = !this.isEdit;
        },
        updateNote() {
            this.$emit('update',this.id, this.newText, 'noteText')
            this.isEdit = !this.isEdit;
        }
    }
}