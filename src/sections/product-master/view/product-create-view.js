// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

export default function ProductMasterCreateView() {
  const settings = useSettingsContext();

  const [product, setproduct_category] = useState([])
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const fetchData = async () => {
    const groupresponse = await axios.get('api/client/manager');
    const newdata = JSON.parse(JSON.stringify(groupresponse.data.data))
    // console.log(newdata);
    setIsLoading(false);
    const newGroupData = newdata.map((item) => {
      return { id: item._id}
    })
    console.log(newGroupData);
    setproduct_category(newGroupData);
    console.log(product);
    setIsLoading(false);
  }
  useEffect(() => {
    
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.product.masterlist,
          },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm />
    </Container>
  );
}
