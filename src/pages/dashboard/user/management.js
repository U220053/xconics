import { Helmet } from 'react-helmet-async';
import React from 'react'
import { UserManagementView} from 'src/sections/user/view';

function management() {
  return (
    <>
    <Helmet>
      <title> Dashboard: User List</title>
    </Helmet>

    <UserManagementView />
  </>
  )
}

export default management