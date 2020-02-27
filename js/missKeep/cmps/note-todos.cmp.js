export default {
    template: `
        <section class="note-todos">
            <div class="note-todos-content"> 
                <div class="todos">
                    <h3>{{todos.info.label}}</h3>
                    <div class="todo" v-for="todo in todos.info.todos">{{todo}}</div>
                </div>
            </div>
            <div class="flex">
                <div class="toolbar"><div>
                <span class="fas fa-list visible"></span>
            </div>
        </section>
    `,
    props: ['todos']
}