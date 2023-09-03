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
  const [dataCustomer, setDataCustomer] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/customer/get/${id}`);
        // const data = await response.json();

        setDataCustomer(response.data.data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    }

    fetchData();
    // console.log({ dataCustomer });
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
          { name: dataCustomer?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CustomerNewEditForm currentCustomer={dataCustomer} />
    </Container>
  );
}

CustomerEditView.propTypes = {
  id: PropTypes.string,
};
