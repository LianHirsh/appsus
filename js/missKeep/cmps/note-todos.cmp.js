import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-todos">
            <span v-if="isPinned" class="fas fa-thumbtack pinnedNote"></span>
            <div class="note-todos-content"> 
                <div class="todos">
                    <h3>{{info.label}}</h3>
                    <div class="todo" v-for="todo in info.todos">
                        <p @click="$event.target.classList.toggle('done')">{{todo.text}}</p>
                    </div>
                </div>
            </div>
            <div class="flex space-between">
                <span class="fas fa-list visible type"></span>
                <div class="toolbar">
                    <span @click="pinNote" class="fas fa-thumbtack"></span>
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>

            <section v-if="isEdit" class="edit-note">
                <input
                v-model="todosTxt"
                type="text"
                autocomplete=off
                />
                <div>
                    <button @click="updateNote">Update</button>
                    <button @click="editNote">Cancel</button>
                <div>
            </section>
            <note-colors v-if="isColorOpt" @colorChange="changeColor"></note-colors>
        </section>
    `,
    props: ['info', 'id', 'isPinned'],
    data() {
        return {
            isEdit: false,
            isColorOpt: false,
            todos: this.info.todos,
            <<
            << << < HEAD
            todosTxt: '' ===
                === = >>>
                >>> > f7847f917d872f1f819fc95361505c0e04c5be17
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
        },
        editNote() {
            this.isEdit = !this.isEdit;
            if (this.isEdit) {
                this.todosTxt = this.todos.map(todo => {
                    return todo.text
                });
                this.todosTxt = this.todosTxt.join(',');
            }
        },
        updateNote() {
            let todosArr = this.todosTxt.split(',');
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
        <<
        << << < HEAD ===
        === =
        complete(todoIdx) {
            this.$emit('complete', this.id, todoIdx);
        },
        >>>
        >>> > f7847f917d872f1f819fc95361505c0e04c5be17
        pinNote() {
            this.$emit('pin', this.id);
        },
        padTime(time) {
            return (time < 10) ? '0' + time : time;
        },
        doneAt(time) {
            this.doneAt = time;
            this.doneAtTime;
        }
    },
    computed: {
        // doneAtTime() {
        //     let time = new Date(this.doneAt);
        //     const hours = this.padTime(time.getHours());
        //     const minutes = this.padTime(time.getMinutes());
        //     time = `${hours}:${minutes}`;

        //     return time;
        // }
    },
    components: {
        noteColors
    }
}