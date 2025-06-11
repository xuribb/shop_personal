import IndexViewClient from '../views/client/IndexView.vue';
import IndexViewAdmin from '../views/admin/IndexView.vue';

export default [
    {
        path: '/',
        name: 'client',
        component: IndexViewClient,
    },
    {
        path: '/admin',
        name: 'admin',
        component: IndexViewAdmin,
    }
];