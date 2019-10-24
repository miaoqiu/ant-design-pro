export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          // {
          //   path: '/dashboard/workplace',
          //   name: 'workplace',
          //   component: './Dashboard/Workplace',
          // },
        ],
      },

      {
        name: 'account',
        icon: 'user',
        path: '/account',
        // routes: [
        //   {
        //     path: '/account/center',
        //     name: 'center',
            component: './Account/Center/Center',
            authority: ['admin'],

        // routes: [
              // {
              //   path: '/account/center',
              //   redirect: '/account/center/articles',
              // },
              // {
              //   path: '/account/center/articles',
              //   component: './Account/Center/Articles',
              // },
              // {
              //   path: '/account/center/applications',
              //   component: './Account/Center/Applications',
              // },
              // {
              //   path: '/account/center/projects',
              //   component: './Account/Center/Projects',
              // },
            // ],
        //   }
        // ],
      },



      {
        name: 'filter',
        icon: 'user',
        path: '/filter',
        // routes: [
        //   {
        //     path: '/account/center',
        //     name: 'center',
        component: './Filter/Filter/Filter',
        authority: ['admin'],

        // routes: [
        // {
        //   path: '/account/center',
        //   redirect: '/account/center/articles',
        // },
        // {
        //   path: '/account/center/articles',
        //   component: './Account/Center/Articles',
        // },
        // {
        //   path: '/account/center/applications',
        //   component: './Account/Center/Applications',
        // },
        // {
        //   path: '/account/center/projects',
        //   component: './Account/Center/Projects',
        // },
        // ],
        //   }
        // ],
      },




      {
        component: '404',
      },
    ],
  },
];
