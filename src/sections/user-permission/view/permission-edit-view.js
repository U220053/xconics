import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import {useState,useEffect} from 'react';
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import axios from 'src/utils/axios';
import PermissionNewEditForm from '../permission-new-edit-form';
// ----------------------------------------------------------------------

export default function PermissionEditView({ id }) {
  const settings = useSettingsContext();
  const [dataUser,setDataUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`user/permission/get/${id}`);
        // const data = await response.json();

      setDataUser(response.data.data);


      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  // const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.user.root,
          },
          { name: dataUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PermissionNewEditForm currentUser={dataUser} />
    </Container>
  );
}

PermissionEditView.propTypes = {
  id: PropTypes.string.isRequired, // Add this line to validate the 'id' prop
};







