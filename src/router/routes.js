// 前台系统
import IndexViewClient from '../views/client/IndexView.vue';
import Home from '../section/client/Home.vue';
import Category from '../section/client/Category.vue';
import Shop from '../section/client/Shop.vue';
import Order from '../section/client/Order.vue';

import ProfileView from '../views/client/ProfileView.vue';
import Profile from '../section/client/Profile.vue';
import Location from '../section/client/Location.vue';
import ShopCart from '../section/client/ShopCart.vue';

import LoginView from '../views/client/LoginView.vue';







// 后台系统
import MenuViewAdmin from '../views/admin/MenuView.vue';
import IndexViewAdmin from '../views/admin/IndexView.vue';
import UserListAdmin from '../views/admin/UserListView.vue';
import ShopCategoryAdmin from '../views/admin/Shop/ShopCategoryView.vue';
import ShopListAdmin from '../views/admin/Shop/ShopListView.vue';
import OrderListAdmin from '../views/admin/OrderListView.vue';
import PayListAdmin from '../views/admin/PayListView.vue';

import SiteConfigAdmin from '../views/admin/SiteConfigView.vue';
import BaseConfigAdmin from '../views/admin/SiteConfig/BaseConfigView.vue';
import PassEditAdmin from '../views/admin/SiteConfig/PassEditView.vue';
import OtherConfigAdmin from '../views/admin/SiteConfig/OtherConfigView.vue';

import LoginViewAdmin from '../views/admin/LoginView.vue';


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
                path: 'category/:category_id/:category_name',
                component: Category,
            },
            {
                path: 'shop/:category_id/:category_name/:shop_id',
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
            {
                path: 'shopcart',
                component: ShopCart,
            }
        ]
    },
    {
        path: '/login',
        component: LoginView,
    },
    {
        path: '/admin',
        component: MenuViewAdmin,
        children: [
            {
                path: '',
                component: IndexViewAdmin
            },
            {
                path: 'user_list',
                component: UserListAdmin
            },
            {
                path: 'shop_category',
                component: ShopCategoryAdmin
            },
            {
                path: 'shop_list',
                component: ShopListAdmin
            },
            {
                path: 'order_list',
                component: OrderListAdmin
            },
            {
                path: 'pay_list',
                component: PayListAdmin
            },
            {
                path: 'site_config',
                component: SiteConfigAdmin,
                children: [
                    {
                        path: '',
                        component: BaseConfigAdmin
                    },
                    {
                        path: 'pass_edit',
                        component: PassEditAdmin
                    },
                    {
                        path: 'other_config',
                        component: OtherConfigAdmin
                    },
                ]
            }
        ]
    },
    {
        path: '/admin/login',
        component: LoginViewAdmin
    },
];