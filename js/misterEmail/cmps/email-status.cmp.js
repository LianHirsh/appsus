import { eventBus } from '../../mainApp/services/event-bus.service.js';

export default {
    template: `
        <section class="email-status">
            <span>{{unreadCount}}</span>
        </section>
    `,
    data() {
        return {
            unreadCount: 0
        }
    },
    created() {
        eventBus.$on('countChange', (count) => {
            this.unreadCount = count;
        });
    }
}