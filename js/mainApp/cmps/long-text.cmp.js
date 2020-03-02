export default {
    template: `
    <section class="long-text">
        <div>
            <div v-if="isCloseState" class="txt">{{txt}}</div>
        </div>
    </section>
    `,
    props: ['txt', 'isCloseState']
}