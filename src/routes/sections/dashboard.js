import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
// auth
import { AuthGuard } from 'src/auth/guard'
// layouts
import DashboardLayout from 'src/layouts/dashboard'
// components
import { LoadingScreen } from 'src/components/loading-screen'

// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'))
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'))
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'))
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'))
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'))
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'))
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'))
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'))
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'))
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'))
//location-premises
const ZoneListPage = lazy(() => import('src/pages/dashboard/location/zone-list'));
const ZoneCreatePage = lazy(() => import('src/pages/dashboard/location/zone-new'));
const ZoneEditPage = lazy(() => import('src/pages/dashboard/location/zone-edit'));
//PRODUCT-MASTER
const ProductMasterListPage = lazy(() => import('src/pages/dashboard/product/master-list'))
const ProductMasterCreatePage = lazy(() => import('src/pages/dashboard/product/master-new'))
const ProductMasterEditPage = lazy(() => import('src/pages/dashboard/product/master-edit'))
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'))
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'))
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
// const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
// const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));

//CUSTOMER
const CustomerListPage = lazy(() => import('src/pages/dashboard/customer/list'));
const CustomerPage = lazy(() => import('src/pages/dashboard/customer/edit'));
const CustomerCreatePage = lazy(() => import('src/pages/dashboard/customer/new'));

//CLIENT
const ClientListPage = lazy(() => import('src/pages/dashboard/client/list'));
const ClientPage = lazy(() => import('src/pages/dashboard/client/edit'));
const ClientCreatePage = lazy(() => import('src/pages/dashboard/client/new'));

// USER PERMISSION
const PermissionListPage = lazy(() => import('src/pages/dashboard/user/permission'))
const PermissionCreatePage = lazy(() => import('src/pages/dashboard/user/permissionnew'));
const PermissionEditPage = lazy(() => import('src/pages/dashboard/user/permissionedit'));


// USER GROUP
const GroupListPage = lazy(() => import('src/pages/dashboard/user/grouplist'));
const GroupCreatePage = lazy(() => import('src/pages/dashboard/user/groupnew'));
const GroupEditPage = lazy(() => import('src/pages/dashboard/user/groupedit'));

// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'))
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'))
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'))
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'))
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'))
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'))
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'))
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'))
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'))
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'))
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'))
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'))
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'))
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'))
const MailPage = lazy(() => import('src/pages/dashboard/mail'))
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'))
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'))
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'))
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'))

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      {
        path: 'user',
        children: [
          { element: <UserListPage />, index: true },
          { path: 'list', element: <UserListPage /> },
          // { path: 'cards', element: <UserCardsPage /> },
         
          { path: 'permission', element: <PermissionListPage /> },
          { path: 'permission/:id/edit', element: <PermissionEditPage /> },
          { path: 'permission/new', element: <PermissionCreatePage/> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
          // { path: 'management', element: <UserManagementPage /> },
          { path: 'grouplist', element: <GroupListPage /> },
          { path: 'group/new', element: <GroupCreatePage/> },
          { path: 'group/:id/edit', element: <GroupEditPage/> },
        ],
      },
      {
        path: 'customer',
        children: [
          { element: <CustomerListPage />, index: true },
          { path: 'list', element: <CustomerListPage /> },

          { path: 'new', element: <CustomerCreatePage /> },
          { path: ':id/edit', element: <CustomerPage /> },
        ],
      },
      {
      path: 'client',
      children: [
        { element: <ClientListPage />, index: true },
        { path: 'list', element: <ClientListPage /> },

        { path: 'new', element: <ClientCreatePage /> },
        { path: ':id/edit', element: <ClientPage /> },
      ],
    },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
         
          { path: 'masterlist', element: <ProductMasterListPage /> },
         
          { path: 'master/new', element: <ProductMasterCreatePage /> },
          { path: 'master/:id/edit', element: <ProductMasterEditPage /> },
        ],
      },
      {
        path: 'location',
        children: [
          { element: <ZoneListPage />, index: true },
          { path: 'zonelist', element: <ZoneListPage /> },
          { path: 'zone/new', element: <ZoneCreatePage /> },
          { path: 'zone/:id/edit', element: <ZoneEditPage /> },
        ],
      },
      // {
      //   path: 'productmaster',
      //   children: [
      //     { element: <ProductMasterListPage />, index: true },
      //     { path: 'list', element: <ProductMasterListPage /> },
         
      //     { path: 'new', element: <ProductMasterCreatePage /> },
      //     { path: ':id/edit', element: <ProductMasterEditPage /> },
      //   ],
      // },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
]
