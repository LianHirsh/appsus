import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-video">
            <div class="note-video-content">
                <iframe class="video" :title="info.title" :src="'https://www.youtube.com/embed/'+info.urlYouTubeId">
                </iframe>
            </div>
            <div class="flex space-between">
                <span class="fab fa-youtube visible type"></span>
                <div class="toolbar">
                    <span @click="pinNote" class="fas fa-thumbtack"></span>
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>

            <section v-if="isEdit">
                <input
                v-model="newUrlYouTubeId"
                type="text"
                autocomplete=off
                />
                <button @click="updateNote">Update</button>
                <button @click="editNote">Cancel</button>
            </section>
            <note-colors v-if="isColorOpt"  @colorChange="changeColor"></note-colors>
        </section>
    `,
    props: ['info', 'id'],
    data() {
        return {
            isEdit: false,
            newUrlYouTubeId: this.info.urlYouTubeId,
            isColorOpt: false
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
            this.$emit('update', this.id, this.newUrlYouTubeId, 'noteVideo')
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