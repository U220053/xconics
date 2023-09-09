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
//
// eslint-disable-next-line no-unused-vars
import UserNewEditForm from '../user-new-edit-form';

function UserCreateView() {
  const settings = useSettingsContext();
  const [userGroup, setUserGroup] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {

    const fetchData = async () => {
      const groupresponse = await axios.get('api/user/usergroups')

      console.log("IN view", groupresponse.data.data);
      const newdata = JSON.parse(JSON.stringify(groupresponse.data.data))
      setIsLoading(false);
      const newGroupData = newdata.map((item) => {
        return { id: item._id, group_name: item.user_group_name }
      })
      setUserGroup(newGroupData);

      console.log("SECOND DATA", newGroupData);
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
        heading="Create a new user "
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'List',
            href: paths.dashboard.user.root,
          },
          { name: 'New user' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm userGroup={userGroup} />
    </Container>
  );
}

export default UserCreateView;
