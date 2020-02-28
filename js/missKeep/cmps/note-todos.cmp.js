import noteColors from './note-colors.cmp.js';
export default {
    template: `
        <section class="note-todos">
            <div class="note-todos-content"> 
                <div class="todos">
                    <h3>{{info.label}}</h3>
                    <div class="todo" v-for="todo in info.todos">
                        <p>{{todo.text}}</p>
                    </div>
                </div>
            </div>
            <div class="flex space-between">
                <span class="fas fa-list visible"></span>
                <div class="toolbar">
                    <span @click="editNote" class="fas fa-edit"></span>
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                    <span @click="changeBkgColor" class="fas fa-palette info colors dropdown"></span>
                </div>
            </div>

            <section v-if="isEdit">
                <input
                v-model="newTodos"
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
            newTodos: this.info.url,
            isColorOpt: false
        }
    },
    methods: {
        removeNote() {
            this.$emit('remove', this.id)
        },
        editNote() {
            this.isEdit = !this.isEdit;
        },
        updateNote() {
            this.$emit('update', this.id, this.newTodos, 'noteTodos')
            this.isEdit = !this.isEdit;
        },
        changeBkgColor() {
            this.isColorOpt = !this.isColorOpt;
        },
        changeColor(color) {
            this.$emit('colorChange', color, this.id)
        }
    },
    components: {
        noteColors
    }
}