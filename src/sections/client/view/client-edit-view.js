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
import ClientNewEditForm from '../client-new-edit-form';
// import { CustomerEditView } from '.';
// ----------------------------------------------------------------------

export default function ClientEditView({ id }) {
  const settings = useSettingsContext();
  // const [userGroup, setUserGroup] = useState([]);
  // const [client_manager_ref, setClient_manager_ref] = useState([]);
  // const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dataClient, setDataClient] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // const client_manager_ref = await axios.get('api/client/manager');

        const response = await axios.get(`api/client/manager/get/${id}`);//get single
        setDataClient(response.data.data);

       
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching API data:', error);
        setIsLoading(false); // Set loading to false on error
      }
    }

    fetchData();
   
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
            name: 'Client',
            href: paths.dashboard.client.root,
          },
          { name: dataClient?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ClientNewEditForm
        currentClient={dataClient}
       
      />
    </Container>
  );
}

ClientEditView.propTypes = {
  id: PropTypes.string,
};
