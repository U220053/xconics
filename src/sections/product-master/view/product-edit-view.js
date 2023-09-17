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
import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductMasterEditView({ id }) {
  const settings = useSettingsContext();
  const [category, setCategory] = useState([]);
  const [enclosure, setEnclosure] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/product/get/${id}`);
        setDataProduct(response.data.data);

        setIsLoading(false);
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
        heading="Edit Product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Product Master',
            href: paths.dashboard.product.masterlist,
          },
          { name: dataProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={dataProduct} category={category} enclosure={enclosure} />
    </Container>
  );
}

ProductMasterEditView.propTypes = {
  id: PropTypes.string,
};
