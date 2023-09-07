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
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

export default function ClientCreateView() {
  const settings = useSettingsContext();
  // const [userGroup, setUserGroup] = useState([]);
  // const [client_manager_ref,setClient_manager_ref] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //     const groupresponse = await axios.get('api/user/usergroups');
  //     const client_manager_ref = await axios.get('api/client/manager');
  //     console.log('IN view', client_manager_ref.data.data);
  //     const newdata2 = JSON.parse(JSON.stringify(client_manager_ref.data.data));
  
  //     const client_manager = newdata2.map((item) => {
  //       return { id: item._id,client_manager_ref: item.contact_person_name };
  //     });

  //     setClient_manager_ref( client_manager);
  //     const newdata = JSON.parse(JSON.stringify(groupresponse.data.data));

  //     const newGroupData = newdata.map((item) => {
  //       return { id: item._id, group_name: item.user_group_name };
  //     });
  //     setUserGroup(newGroupData);
  //     setIsLoading(false);
  //     console.log('SECOND DATA', newGroupData);
  //   }catch(e){
  //     console.log('Error', e);
  //     setIsLoading(false);
   
  //   }
  //   };

  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
