
// routes
import { useParams } from 'src/routes/hooks';
// sections
import { DeviceEditView } from 'src/sections/device-master/view';

// ----------------------------------------------------------------------

export default function DeviceEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <title> Dashboard: User Permission Edit</title>
      <DeviceEditView id={`${id}`} />
    </>
  );
}
