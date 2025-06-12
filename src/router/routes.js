import IndexViewClient from '../views/client/IndexView.vue';
import Home from '../section/client/Home.vue';
import Category from '../section/client/Category.vue';
import LoginView from '../views/client/LoginView.vue';

import IndexViewAdmin from '../views/admin/IndexView.vue';

export default [
    {
        path: '/',
        component: IndexViewClient,
        children: [
            {
                path: '',
                component: Home,
            },
            {
                path: 'category',
                component: Category,
            },
        ]
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