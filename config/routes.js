// https://umijs.org/zh/guide/router.html
export default [
  {
    path: '/admin',
    component: '../layouts/AdminLayout',
    routes: [
      {
        name: 'Admin Sign In',
        path: '/admin/signin',
        component: './admin/SignIn',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/administration',
        name: 'Administration',
        component: '../layouts/ManagementLayout',
        authority: ['admin'],
        routes: [
          {
            name: 'Partner Management',
            path: '/administration/contact-management',
            component: './admin/ContactManagement',
            iconPath: '/fast.svg',
            authority: ['admin'],
          },
          {
            name: 'Order Management',
            path: '/administration/order-management',
            component: './admin/OrderManagement',
            iconPath: '/fast.svg',
            authority: ['admin'],
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
