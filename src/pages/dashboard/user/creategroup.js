import { Helmet } from 'react-helmet-async';
// sections
import { GroupCreateView} from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Group</title>
      </Helmet>

      <GroupCreateView />
    </>
  );
}
