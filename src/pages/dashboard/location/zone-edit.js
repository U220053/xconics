
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { ZoneEditView } from 'src/sections/zone-master/view';

// ----------------------------------------------------------------------

export default function ZoneEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: Zone Edit</title>
      <ZoneEditView id={`${id}`} />
    </>
  );
}