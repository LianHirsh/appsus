import homePage from './mainApp/pages/home.cmp.js';
import aboutPage from './mainApp/pages/about.cmp.js';
import noteApp from './missKeep/pages/note-app.cmp.js';
import emailApp from './misterEmail/pages/email-app.cmp.js';
import emailDetailes from './misterEmail/pages/email-details.cmp.js';
import emailCompose from './misterEmail/pages/email-compose.cmp.js';
import emailList from './misterEmail/cmps/email-list.cmp.js';

const routes = [
    { path: '/', component: homePage },
    { path: '/about', component: aboutPage },
    { path: '/noteApp', component: noteApp },
    { path: '/emailApp', component: emailApp,
    children:[
        {path:'compose', component:emailCompose},
        {path:'inbox', component:emailList},
        {path:'starred', component:emailList},
        {path:'snoozed', component:emailList},
        {path:'sentMail', component:emailList},
        {path:'drafts', component:emailList}
    ]
    },
    { path: '/emailApp/:id', component: emailDetailes }
];

export const router = new VueRouter({ routes });