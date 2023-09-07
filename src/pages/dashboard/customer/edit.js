// routes
import { useParams } from 'src/routes/hooks';
// sections
import { CustomerEditView } from 'src/sections/customer/view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: Customer Edit</title>

      <CustomerEditView id={`${id}`} />
    </>
  );
}
