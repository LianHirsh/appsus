import { noteService } from '../services/note.service.js';
import addNote from '../cmps/note-add.cmp.js';
import noteText from '../cmps/note-text.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    template: `
        <section class="note-app">
            <add-note></add-note>

            <h3 v-if="isPinnedNotes">Pinned Notes</h3>

            <ul class="pinned-notes notes-list">
                <li v-for="(note, idx) in notes" v-if="note.isPinned" class="note" :style="bkg(note)">
                    <component 
                        :is="note.type" 
                        :info="note.info"
                        :id="note.id"
                        @pin="pinNote"
                        @remove="removeNote"
                        @update="updateNote">
                    </component>
                </li>
            </ul>

            <h3 v-if="isPinnedNotes">Other Notes</h3>
            <ul class="notes-list">
                <li v-for="(note, idx) in notes" v-if="!note.isPinned" class="note" :style="bkg(note)">
                    <component 
                        :is="note.type" 
                        :info="note.info"
                        :id="note.id"
                        @pin="pinNote"
                        @remove="removeNote"
                        @update="updateNote">
                    </component>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: [],
            isPinnedNotes: false
        }
    },
    created() {
        noteService.query()
            .then(notes => {
                console.log(notes);
                this.notes = notes;
            })
    },
    methods: {
        removeNote(noteId) {
            noteService.removeNote(noteId)
        },
        bkg(note) {
            return `background-color: ${note.style.backgroundColor}`;
        },
        updateNote(noteId, info, type) {
            noteService.updateNote(noteId, info, type)
        },
        pinNote(noteId) {
            noteService.changePinnedStatus(noteId)
                .then(()=> {
                    this.isPinnedNotes = true
                })
        }
    },
    components: {
        addNote,
        noteService,
        noteText,
        noteImg,
        noteVideo,
        noteTodos
    }
}