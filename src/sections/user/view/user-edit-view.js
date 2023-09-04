import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import axios from 'src/utils/axios';
import UserNewEditForm from '../user-new-edit-form';
// ----------------------------------------------------------------------

// ...
export default function UserEditView({ id }) {
  const settings = useSettingsContext();
  const [userGroup, setUserGroup] = useState([]);
  const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/user/get/${id}`);
        setDataUser(response.data.data);
        setIsLoading(false); // Set loading to false when data is fetched

        const groupresponse = await axios.get('api/user/usergroups');
        const newdata = JSON.parse(JSON.stringify(groupresponse.data.data));
        const newGroupData = newdata.map((item) => {
          return { id: item._id, group_name: item.user_group_name };
        });
        setUserGroup(newGroupData);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setIsLoading(false); // Set loading to false on error
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  // Render the component when data is available
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

      <UserNewEditForm currentUser={dataUser} userGroup={userGroup} />
    </Container>
  );
}
// ...


UserEditView.propTypes = {
  id: PropTypes.string,
};