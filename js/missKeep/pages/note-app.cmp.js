import { noteService } from '../services/note.service.js';
import addNote from '../cmps/note-add.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteList from '../cmps/note-list.cmp.js';

export default {
    template: `
        <section class="note-app">
            <add-note></add-note>
            <note-filter @filterByText="filterNotes" @filterByType="filterNotes"></note-filter>
            <h3 v-if="isPinnedNotes">Pinned Notes</h3>
            <note-list v-if="isPinnedNotes" :notes="pinnedNotes" 
            @pin="pinNote" 
            @remove="removeNote"
            @update="updateNote"
            @changeBkg="changeColorBkg">
            </note-list>
            
            <h3 v-if="isPinnedNotes && unPinnedNotes.length !== 0">Other Notes</h3>
            <note-list :notes="unPinnedNotes"
            @pin="pinNote" 
            @remove="removeNote"
            @update="updateNote"
            @changeBkg="changeColorBkg">
            </note-list>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: '',
            isPinnedNotes: false
        }
    },
    computed: {
        pinnedNotes() {
            if (this.isPinnedNotes) {
                return this.filterByPinned(true);
            }
        },
        unPinnedNotes() {
            return this.filterByPinned(false);
        }
    },
    created() {
        this.getNotes();
        this.getUpdateNotes();
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
        updateNote(noteId, info, type) {
            noteService.updateNote(noteId, info, type)
        },
        changeColorBkg(newColor, id) {
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
                    this.getUpdateNotes();
                })
        },
        getUpdateNotes() {
            noteService.isPinnedNotes()
                .then(res => {
                    this.isPinnedNotes = res;
                });
        },
        filterByPinned(isPinned) {
            return this.notes.filter(note => note.isPinned === isPinned);
        }
    },
    components: {
        addNote,
        noteService,
        noteFilter,
        noteList
    }
}