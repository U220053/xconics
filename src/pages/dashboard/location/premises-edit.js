
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { PremisesEditView } from 'src/sections/premises-master/view';

// ----------------------------------------------------------------------

export default function PremisesEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: User Permission Edit</title>
      <PremisesEditView id={`${id}`} />
    </>
  );
}
