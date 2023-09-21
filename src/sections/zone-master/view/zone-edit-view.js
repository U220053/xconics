import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import axios from 'src/utils/axios';
import ZoneNewEditForm from '../zone-new-edit-form';

export default function ZoneEditView({ id }) {
  const settings = useSettingsContext();
  const [userPer, setUserPer] = useState([]);
  const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/location/zone/get/${id}`);
        setDataUser(response.data.data);
        setIsLoading(false); // Set loading to false when data is fetched
        // const groupresponse = await axios.get('api/user/usergroups');
        // const newdata = JSON.parse(JSON.stringify(groupresponse.data.data));
        // eslint-disable-next-line arrow-body-style
        // const newGroupData = newdata.map((item) => {
        //   return { id: item._id, group_name: item.user_group_name }
        // })
        // setUserPer(newGroupData);
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
            name: 'Zone',
            href: paths.dashboard.location.zonelist,
          },
          { name: 'Edit Zone'},
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
    <ZoneNewEditForm  currentZone={dataUser} />
    </Container>
  );
}

ZoneEditView.propTypes = {
  id: PropTypes.string.isRequired, // Add this line to validate the 'id' prop
};







