import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import axios from 'src/utils/axios';
import PremisesNewEditForm from '../premises-new-edit-form';

export default function PremisesEditView({ id }) {
  const settings = useSettingsContext();
  const [userLoc, setUserLoc] = useState([]);
  const [dataPre, setDataPre] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/location/premises/get/${id}`);
        setDataPre(response.data.data);

        setIsLoading(false); // Set loading to false when data is fetched
        const locresponse = await axios.get('api/location');
        const newdata = JSON.parse(JSON.stringify(locresponse.data.data));
        // eslint-disable-next-line arrow-body-style
        const newlocData = newdata.map((item) => {
          return { id: item._id, location_name: item.location_name }
        })
        setUserLoc(newlocData);
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
            name: 'Premises',
            href: paths.dashboard.location.premiseslist,
          },
          { name: 'Edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
    <PremisesNewEditForm currentPremises={dataPre} userLoc={userLoc} />
    </Container>
  );
}

PremisesEditView.propTypes = {
  id: PropTypes.string.isRequired, // Add this line to validate the 'id' prop
};







