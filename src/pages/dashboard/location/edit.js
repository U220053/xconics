// routes
import { useParams } from 'src/routes/hooks';
// sections
import { LocationEditView } from 'src/sections/location/view';

// ----------------------------------------------------------------------

export default function LocationEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: Location Edit</title>

      <LocationEditView id={`${id}`} />
    </>
  );
}
