import IndexViewClient from '../views/client/IndexView.vue';
import LoginView from '../views/client/LoginView.vue';

import IndexViewAdmin from '../views/admin/IndexView.vue';

export default [
    {
        path: '/',
        component: IndexViewClient,
    },
    {
        path: '/login',
        component: LoginView,
    },
    {
        path: '/admin',
        component: IndexViewAdmin,
    }
];