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
import LocationNewEditForm from '../location-new-edit-form';

// ----------------------------------------------------------------------

export default function LocationEditView({ id }) {
  const settings = useSettingsContext();
  const [client_manager_ref, setClient_manager_ref] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataLocation, setDataLocation] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const client_manager_ref = await axios.get('api/client/customer');

        const response = await axios.get(`api/location/get/${id}`); 
       
        setDataLocation(response.data.data);
        const newdata2 = JSON.parse(JSON.stringify(client_manager_ref.data.data));
        const client_manager = newdata2.map((item) => {
          return { id: item._id, client_manager_ref: item.contact_person_name };
        });
        
        setClient_manager_ref(client_manager);
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
        heading="Edit Location"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Location',
            href: paths.dashboard.location.root,
          },
          { name: dataLocation?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LocationNewEditForm currentLocation={dataLocation}  client_manager_ref={client_manager_ref}/>
    </Container>
  );
}

LocationEditView.propTypes = {
  id: PropTypes.string,
};
