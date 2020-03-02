import noteText from '../cmps/note-text.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    template: `
    <section class="note-list">
        <ul class="notes-list">
            <li v-for="(note, idx) in notes" class="note" :style="bkg(note)">
                <component 
                :is="note.type" 
                :info="note.info"
                :id="note.id"
                :isPinned="note.isPinned"
                @pin="pinNote"
                @remove="removeNote"
                @update="updateNote"
                @colorChange="chngeBkgColor">
                </component>
            </li>
        </ul>
    </section>
    `,
    props: ['notes'],
    methods: {
        bkg(note) {
            return `background-color: ${note.style.backgroundColor}`;
        },
        chngeBkgColor(color, id) {
            this.$emit('changeBkg', color, id);
        },
        removeNote(noteId) {
            this.$emit('remove', noteId);
        },
        updateNote(noteId, info, type) {
            this.$emit('update', noteId, info, type);
        },
        pinNote(noteId) {
            this.$emit('pin', noteId);
        }

    },
    components: {
        noteText,
        noteImg,
        noteVideo,
        noteTodos
    }
}