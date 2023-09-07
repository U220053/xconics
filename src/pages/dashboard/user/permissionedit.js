
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { PermissionEditView } from 'src/sections/user-permission/view';

// ----------------------------------------------------------------------

export default function PermissionEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: User Permission Edit</title>
      <PermissionEditView id={`${id}`} />
    </>
  );
}
