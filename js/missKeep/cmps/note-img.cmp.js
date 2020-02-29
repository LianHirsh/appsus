import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-img">
            <div class="note-img-content"> 
                <img :src="info.url" :title="info.title"/>
            </div>
            <div class="flex space-between">
                <span class="far fa-image visible type"></span>
                <div class="toolbar">
                    <span @click="pinNote" class="fas fa-thumbtack"></span>
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>

            <section v-if="isEdit">
                <input
                v-model="newUrl"
                type="text"
                autocomplete=off
                />
                <button @click="updateNote">Update</button>
                <button @click="editNote">Cancel</button>
            </section>
            <note-colors v-if="isColorOpt" @colorChange="changeColor"></note-colors>
        </section>
    `,
    props: ['info', 'id'],
    data() {
        return {
            isEdit: false,
            newUrl: this.info.url,
            isColorOpt: false
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
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
            this.$emit('update', this.id, this.newUrl, 'noteImg')
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