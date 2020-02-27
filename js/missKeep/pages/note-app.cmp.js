import {noteService} from '../services/note.service.js';
import addNote from '../cmps/note-add.cmp.js';
import noteText from '../cmps/note-text.cmp.js';
import noteImg from '../cmps/note-img.cmp.js';
import noteVideo from '../cmps/note-video.cmp.js';
import noteTodos from '../cmps/note-todos.cmp.js';

export default {
    template: `
        <section class="note-app">
            <add-note></add-note>

            <ul>
                <li v-for="(note, idx) in notes">
                    <component 
                        :is="note.type" 
                        :info="note.info">
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
            .then (notes=> {
                this.notes = notes;
            })
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