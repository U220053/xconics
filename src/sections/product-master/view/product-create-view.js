// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';
import { useEffect, useState } from 'react';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ProductMasterCreateView() {
  const settings = useSettingsContext();

  const [category, setCategory] = useState([]);
  const [enclosure, setEnclosure] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchData = async () => {
      const productcategory = await axios.get('api/product/category');
      const productenclosure = await axios.get('api/product/enclosure');
      const newdata = JSON.parse(JSON.stringify(productcategory.data.data));
      const newdata1 = JSON.parse(JSON.stringify(productenclosure.data.data));

      setIsLoading(false);
      const newProductCategory = newdata.map((item) => {
        return { id: item._id, category_name: item.category_name };
      });
      setCategory(newProductCategory);
      const newProductEnclosure = newdata1.map((item) => {
        return { id: item._id, enclosure_type: item.enclosure_type };
      });
      setEnclosure(newProductEnclosure);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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

      <ProductNewEditForm category={category} enclosure={enclosure} />
    </Container>
  );
}
