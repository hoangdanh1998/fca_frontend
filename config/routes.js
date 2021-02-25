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
        path: '/fca-management',
        name: 'FCA Management',
        component: '../layouts/ManagementLayout',
        authority: ['admin'],
        routes: [
          {
            path: '/fca-management/partner-management/partner-information',
            name: 'Partner Information',
            component: './admin/PartnerManagement/PartnerInformation/index',
            authority: ['admin'],
            hidden: true,
          },
          {
            name: 'Partner Management',
            path: '/fca-management/partner-management',
            component: './admin/PartnerManagement',
            authority: ['admin'],
          },
          {
            name: 'Order Management',
            path: '/fca-management/order-management',
            component: './admin/OrderManagement',
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
