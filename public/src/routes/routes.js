import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Orcamentos from 'src/components/Dashboard/Views/Orcamentos.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Geral',
        component: Overview
      },
      {
        path: 'orcamentos',
        name: 'orcamentos',
        component: Orcamentos
      }

    ]
  },
  { path: '*', component: NotFound }
]

export default routes
