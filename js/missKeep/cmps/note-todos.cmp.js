import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-todos">
            <div class="note-todos-content"> 
                <div class="todos">
                    <h3>{{info.label}}</h3>
                    <div class="todo" v-for="todo in info.todos">
                        <p @click="$event.target.classList.toggle('done') ; complete(todo)">{{todo.text}}</p>
                    </div>
                </div>
            </div>
            <div class="flex space-between">
                <span class="fas fa-list visible"></span>
                <div class="toolbar">
                    <span @click="pinNote" class="fas fa-thumbtack"></span>
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>

            <section v-if="isEdit">
                <input
                v-model="todos"
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
            isColorOpt: false,
            todos: this.info.todos
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
        },
        editNote() {
            this.isEdit = !this.isEdit;
            let todosTxt = this.todos.map(todo => {
                return todo.text
            });
            this.todos = todosTxt.join(',');
        },
        updateNote() {
            let todosArr = this.todos.split(',');
            let todosObj = todosArr.map(todo => {
                return { text: todo, doneAt: null }
            });

            this.todos = todosObj;

            this.$emit('update', this.id, this.todos, 'noteTodos')
            this.isEdit = !this.isEdit;
        },
        changeBkgColor() {
            this.isColorOpt = !this.isColorOpt;
        },
        changeColor(color) {
            this.$emit('colorChange', color, this.id)
        },
        complete(todo) {
            console.log(todo)
        },
        pinNote() {
            this.$emit('pin', this.id)
        }
    },
    components: {
        noteColors
    }
}