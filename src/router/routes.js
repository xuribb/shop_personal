import IndexViewClient from '../views/client/IndexView.vue';
import Home from '../section/client/Home.vue';
import Category from '../section/client/Category.vue';
import Shop from '../section/client/Shop.vue';
import Order from '../section/client/Order.vue';

import ProfileView from '../views/client/ProfileView.vue';
import Profile from '../section/client/Profile.vue';
import Location from '../section/client/Location.vue';

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
            {
                path: 'shop',
                component: Shop,
            },
            {
                path: 'order',
                component: Order,
            },
        ]
    },
    {
        path: '/profile',
        component: ProfileView,
        children: [
            {
                path: '',
                component: Profile,
            },
            {
                path: 'location',
                component: Location,
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