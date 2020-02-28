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
            <ul class="notes-list">
                <li v-for="(note, idx) in notes" class="note" :style="bkg(note)">
                    <component 
                        :is="note.type" 
                        :info="note.info"
                        :id="note.id"
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
            filterBy: ''
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