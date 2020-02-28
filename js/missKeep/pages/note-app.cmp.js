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
            <ul class="notes-list">
                <li v-for="(note, idx) in notes" class="note">
                    <component 
                        :is="note.type" 
                        :info="note.info"
                        :id="note.id"
                        @remove="removeNote">
                    </component>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            notes: []
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
        removeNote(noteId){
            noteService.removeNote(noteId)   
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