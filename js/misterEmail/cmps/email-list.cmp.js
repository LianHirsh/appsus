import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul class="list-preview">
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail" @removed="removeEmail"></email-preview>
                </li>
            </ul>
        </section>
    `,
    props: ['emails'],
    methods: {
        removeEmail(emailId) {
            this.$emit('removed', emailId);
        }
    },
    components: {
        emailPreview
    }
}