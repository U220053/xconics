import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import axios from 'src/utils/axios';
import ClientNewEditForm from '../client-new-edit-form';

// ----------------------------------------------------------------------

export default function ClientEditView({ id }) {
  const settings = useSettingsContext();

  const [isLoading, setIsLoading] = useState(true);
  const [dataClient, setDataClient] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/client/manager/get/${id}`); 
        setDataClient(response.data.data);

        setIsLoading(false); 
      } catch (error) {
       
        setIsLoading(false); 
      }
    }

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Client"
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

      <ClientNewEditForm currentClient={dataClient} />
    </Container>
  );
}

ClientEditView.propTypes = {
  id: PropTypes.string,
};
