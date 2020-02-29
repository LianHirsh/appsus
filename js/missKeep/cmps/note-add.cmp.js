import { noteService } from '../services/note.service.js'

export default {
    template: `
    <section class="note-add flex space-between">
        <input
        v-if="isTitle"
        v-model="title"
        type="text"
        autocomplete=off
        placeholder="Add title"
        class="add-title"
        />

        <input
        v-if="isTodos"
        v-model="todosLabel"
        type="text"
        autocomplete=off
        placeholder="Add label"
        class="add-lable"
        />

        <input 
        v-model="info"
        @keyup.enter="updateInfo"
        type="text"
        autocomplete=off
        :placeholder="[[placeholder]]"
        class="user-info"
        />

        <div class="icons flex">
            <label>
                <input type="radio" v-model="note.type" value="noteText" checked="true"/>  
                <span class="fas fa-font fa-lg selected"></span>
            </label>
            
            <label>
                <input type="radio" v-model="note.type" value="noteImg" />  
                <span class="far fa-image fa-lg"></span>
            </label>

            <label>
                <input type="radio" v-model="note.type" value="noteVideo" />  
                <span class="fab fa-youtube fa-lg"></span>
            </label>

            <label>
                <input type="radio" v-model="note.type" value="noteTodos" /> 
                <span class="fas fa-list fa-lg"></span>
            </label>
        </div>
    </section>
    `,
    data() {
        return {
            note: { type: 'noteText' },
            placeholder: 'What\'s on your mind...',
            info: '',
            isTodos: false,
            todosLabel: '',
            isTitle: false,
            title: ''
        }
    },
    watch: {
        'note.type' () {
            this.isTodos = false;
            this.isTitle = false;
            this.title = '',
                this.todosLabel = ''

            if (this.note.type === 'noteText') {
                this.placeholder = 'What\'s on your mind...'
            } else if (this.note.type === 'noteImg') {
                this.isTitle = true;
                this.placeholder = 'Enter image URL...'
            } else if (this.note.type === 'noteVideo') {
                this.isTitle = true;
                this.placeholder = 'Enter video URL...'
            } else {
                this.isTodos = true;
                this.placeholder = 'Enter comma separated list...'
            }
        }
    },
    methods: {
        updateInfo() {
            if (this.note.type === 'noteText') this.note.info = { text: this.info }
            else if (this.note.type === 'noteImg') {
                this.note.info = { url: this.info, title: this.title }
            } else if (this.note.type === 'noteVideo') {
                const youtubeId = this.convertYoutubeUrl(this.info);
                this.note.info = { urlYouTubeId: youtubeId, title: this.title }
            } else if (this.note.type === 'noteTodos') {
                let todos = this.info.split(',');
                var todosObj = todos.map(todo => {
                    return { text: todo, doneAt: null }
                });
                this.note.info = { todos: todosObj, label: this.todosLabel };
            }
            noteService.addNote(this.note)
                .then(() => {
                    this.info = '';
                    this.title = '';
                    this.todosLabel = '';
                })
        },
        convertYoutubeUrl(url) {
            const urlParts = url.split('v=');
            return urlParts[urlParts.length - 1];
        }
    }
}