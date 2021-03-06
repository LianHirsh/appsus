import homePage from './mainApp/pages/home.cmp.js';
import noteApp from './missKeep/pages/note-app.cmp.js';
import emailApp from './misterEmail/pages/email-app.cmp.js';
import emailDetailes from './misterEmail/pages/email-details.cmp.js';
import emailCompose from './misterEmail/pages/email-compose.cmp.js';
import emailList from './misterEmail/pages/email-list.cmp.js';

const routes = [
    { path: '/', component: homePage },
    { path: '/noteApp', component: noteApp },
    {
        path: '/emailApp',
        component: emailApp,
        children: [
            { path: 'compose', component: emailCompose },
            { path: 'emailList/:type', component: emailList },
            { path: ':id', component: emailDetailes }
        ]
    },
];

export const router = new VueRouter({ routes });