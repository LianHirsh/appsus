export default {
    template: `
    <section class="long-text">
        <div>
            <div v-if="isCloseState" class="txt">{{text}}</div>
            <div v-else class="txt">{{text}}</div>
        </div>
    </section>
    `,
    props: ['txt', 'isCloseState'],
    data() {
        return {

        }
    },
    computed: {
        text() {
            if (this.isCloseState) {
                let subString = this.txt.substring(0, 50);

                if (this.txt.length > 50) {
                    subString += '...'
                }

                return subString;

            } else {
                return this.txt
            }
        }
    }
};