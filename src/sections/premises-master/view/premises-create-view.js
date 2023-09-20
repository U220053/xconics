/* eslint-disable arrow-body-style */
// eslint-disable-next-line import/no-duplicates
import React from 'react'
// eslint-disable-next-line import/no-duplicates
import { useState, useEffect } from 'react';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import axios from 'src/utils/axios'
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import PremisesNewEditForm from '../premises-new-edit-form';

export default function PremisesCreateView() {
  const settings = useSettingsContext();
  const [userPer, setUserPer] = useState([])
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    const fetchData = async () => {
      const groupresponse = await axios.get('api/location')
      const newdata = JSON.parse(JSON.stringify(groupresponse.data.data))
      setIsLoading(false);
      const newGroupData = newdata.map((item) => {
        return { id: item._id, location_name: item.location_name }
      })
      setUserPer(newGroupData);
      setIsLoading(false);
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }
  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create new premises"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Premises',
            href: paths.dashboard.location.premiseslist,
          },
          { name: 'New premises' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PremisesNewEditForm userPer={userPer} />
    </Container>
  );
}
