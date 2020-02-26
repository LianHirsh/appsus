export default {
    template: `
    <section class="long-text">
        <div>
            <div v-if="isCloseState" class="txt" :class="txtClass">{{txt}}</div>
            <div v-else class="txt">{{txt}}</div>
        </div>
    </section>
    `,
    props: ['txt', 'isCloseState'],
    data() {
        return {

        }
    },
    computed: {
        txtClass() {
            if (this.isCloseState) {
                return 'closeState';
            }
        }
    }
};