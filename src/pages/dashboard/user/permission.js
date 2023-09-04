// import { Helmet } from 'react-helmet-async';
// sections
import { PermissionListView } from 'src/sections/user-permission/view';

// ----------------------------------------------------------------------

export default function PermissionListPage() {
  return (
    <>
      <title> Dashboard: User Group Permission</title>

      <PermissionListView />
    </>
  );
}
