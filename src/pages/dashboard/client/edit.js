// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ClientEditView } from 'src/sections/client/view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: Client Edit</title>

      <ClientEditView id={`${id}`} />
    </>
  );
}
