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
                    <span @click="removeNote" class="fas fa-trash-alt danger"></span>
                </div>
            </div>
        </section>
    `,
    props: ['info','id'],
    methods: {
        removeNote() {
            this.$emit('remove',this.id)
        }
    }
}