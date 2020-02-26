import { router } from './routes.js';
import appHeader from './mainApp/cmps/app-header.cmp.js';
import userMsg from './mainApp/cmps/user-msg.cmp.js';

new Vue({
    el: '#app',
    router,
    tempalte: `
        <section class="appsus">
            <header>
                <app-header></app-header>
                <user-msg></user-msg>
            </header>
            <router-view></router-view>
            <footer>
                Ella&Lian &copy; 2020
            </footer>
        </section>
    `,
    components: {
        appHeader,
        userMsg
    }
})