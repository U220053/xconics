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
import CustomerNewEditForm from '../customer-new-edit-form';
// import { CustomerEditView } from '.';
// ----------------------------------------------------------------------

export default function CustomerEditView({ id }) {
  const settings = useSettingsContext();
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/user/usergroup/${id}`);
        // const data = await response.json();

        setDataUser(response.data.data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
            name: 'Customer',
            href: paths.dashboard.customer.root,
          },
          { name: dataUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CustomerNewEditForm currentUser={dataUser} />
    </Container>
  );
}

CustomerEditView.propTypes = {
  id: PropTypes.string,
};
