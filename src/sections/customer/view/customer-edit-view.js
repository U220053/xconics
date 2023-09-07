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
  const [userGroup, setUserGroup] = useState([]);
  const [client_manager_ref, setClient_manager_ref] = useState([]);
  // const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCustomer, setDataCustomer] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const client_manager_ref = await axios.get('api/client/manager');

        const response = await axios.get(`api/client/customer/get/${id}`);
        setDataCustomer(response.data.data);

        const groupresponse = await axios.get('api/user/usergroups');
        const newdata = JSON.parse(JSON.stringify(groupresponse.data.data));
        const newdata2 = JSON.parse(JSON.stringify(client_manager_ref.data.data));
        const newGroupData = newdata.map((item) => {
          return { id: item._id, group_name: item.user_group_name };
        });
        const client_manager = newdata2.map((item) => {
          return { id: item._id, client_manager_ref: item.contact_person_name };
        });
        setUserGroup(newGroupData);
        setClient_manager_ref(client_manager);
        setIsLoading(false); // Set loading to false when data is fetched
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

      <CustomerNewEditForm
        currentCustomer={dataCustomer}
        userGroup={userGroup}
        client_manager_ref={client_manager_ref}
      />
    </Container>
  );
}

CustomerEditView.propTypes = {
  id: PropTypes.string,
};
