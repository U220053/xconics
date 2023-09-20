// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LocationNewEditForm from '../location-new-edit-form';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

export default function LocationCreateView() {
  const settings = useSettingsContext();
  const [client_manager_ref,setClient_manager_ref] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try{
      
      const client_manager_ref = await axios.get('api/client/customer');
     
      const newdata2 = JSON.parse(JSON.stringify(client_manager_ref.data.data));
  
      const client_manager = newdata2.map((item) => {
        return { id: item._id,client_manager_ref: item.contact_person_name };
      });

      setClient_manager_ref( client_manager);
     
      
      setIsLoading(false);
      
    }catch(e){
      console.log('Error', e);
      setIsLoading(false);
   
    }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Location"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Location',
            href: paths.dashboard.location.root,
          },
          { name: 'New Location' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <LocationNewEditForm client_manager_ref={client_manager_ref}/>
    </Container>
  );
}
