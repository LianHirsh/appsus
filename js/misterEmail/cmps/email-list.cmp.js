import emailPreview from '../cmps/email-preview.cmp.js';

export default {
    template: `
        <section class="email-list">
            <ul>
                <li v-for="currEmail in emails">
                    <email-preview :email="currEmail"></email-preview>
                </li>
            </ul>
        </section>
    `,
    props: ['emails'],
    components: {
        emailPreview
    }
}