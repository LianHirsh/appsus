import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-text">
        <span v-if="isPinned" class="fas fa-thumbtack pinnedNote"></span>
            <div v-if="info" class="note-text-content">
                <p class="text-info">{{info.text}}</p>
            </div>
            <div class="flex space-between">
                <span class="fas fa-font visible type"></span>
                <div class="toolbar">
                    <span @click="pinNote" class="fas fa-thumbtack"></span>
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>
            <section v-if="isEdit" class="edit-note">
                <input
                v-model="newText"
                type="text"
                autocomplete=off/>
                <div> 
                    <button @click="updateNote">Update</button>
                    <button @click="editNote">Cancel</button>
                </div>
            </section>
            <note-colors v-if="isColorOpt" @colorChange="changeColor"></note-colors>
        </section>
    `,
    props: ['info', 'id', 'isPinned'],
    data() {
        return {
            isEdit: false,
            newText: this.info.text,
            isColorOpt: false,
            isPinned: this.info.isPinned
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
        },
        editNote() {
            this.isEdit = !this.isEdit;
        },
        updateNote() {
            this.$emit('update', this.id, this.newText, 'noteText')
            this.isEdit = !this.isEdit;
        },
        changeBkgColor() {
            this.isColorOpt = !this.isColorOpt;
        },
        changeColor(color) {
            this.$emit('colorChange', color, this.id)
        },
        pinNote() {

            this.$emit('pin', this.id)
        }
    },
    components: {
        noteColors
    }
}