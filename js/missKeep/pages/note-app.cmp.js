import { noteService } from '../services/note.service.js';
import addNote from '../cmps/note-add.cmp.js';
import noteText from '../cmps/note-text.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';

export default {
    template: `
        <section class="note-app">
            <note-filter @filterByText="filterNotes" @filterByType="filterNotes"></note-filter>
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
                        @update="updateNote"
                        @colorChange="changeBkg">
                    </component>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: '',
            isPinnedNotes: false
        }
    },
    created() {
        this.getNotes();
    },
    methods: {
        getNotes() {
            noteService.query(this.filterBy)
                .then(notes => {
                    this.notes = notes;
                })
        },
        removeNote(noteId) {
            noteService.removeNote(noteId)
        },
        bkg(note) {
            return `background-color: ${note.style.backgroundColor}`;
        },
        updateNote(noteId, info, type) {
            noteService.updateNote(noteId, info, type)
        },
        changeBkg(newColor, id) {
            noteService.changeBkgColor(newColor, id)
                .then(res => {
                    this.notes = res;
                });
        },
        filterNotes(filterBy) {
            this.filterBy = filterBy;
            this.getNotes();
        },
        pinNote(noteId) {
            noteService.changePinnedStatus(noteId)
                .then(() => {
                    this.isPinnedNotes = true;
                })
        }
    },
    components: {
        addNote,
        noteService,
        noteText,
        noteImg,
        noteVideo,
        noteTodos,
        noteFilter
    }
}