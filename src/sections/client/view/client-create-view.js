// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ClientNewEditForm from '../client-new-edit-form';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ClientCreateView() {
  const settings = useSettingsContext();
  // const [userGroup, setUserGroup] = useState([]);
  // const [client_manager_ref,setClient_manager_ref] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Client"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Client',
            href: paths.dashboard.client.root,
          },
          { name: 'New Client' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ClientNewEditForm />
    </Container>
  );
}
