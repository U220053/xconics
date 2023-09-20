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
import DeviceNewEditForm from '../device-new-edit-form';

export default function DeviceEditView({ id }) {
  const settings = useSettingsContext();
  const [dataUser, setDataUser] = useState(null);
  const [batchid, setBatchid] = useState([]);
  const [client, setClient] = useState([]);
  const [productcode, setProductcode] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`api/product/device/get/${id}`);
        setDataUser(response.data.data);

        const batchresponse = await axios.get('api/product/batch');
        const clientresponse = await axios.get('api/client/customer');
        const productresponse = await axios.get('api/product');

        const newdata33 = JSON.parse(JSON.stringify(productresponse.data.data));
        const newproductdata = newdata33.map((item) => {
          return { id: item._id, product_code: item.product_code };
        });
        setProductcode(newproductdata);

        const newdata2 = JSON.parse(JSON.stringify(clientresponse.data.data));
        const newclientdata = newdata2.map((items) => {
          return { id: items._id, company_name: items.company_name };
        });
        setClient(newclientdata);
        console.log(newclientdata);
        
        const newdata = JSON.parse(JSON.stringify(batchresponse.data.data));
        const newbatchData = newdata.map((item) => {
          return { id: item._id, batch_id: item.batch_id };
        });
        setBatchid(newbatchData);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching API data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // const currentUser = _userList.find((user) => user.id === id);
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
            name: 'Device Master',
            href: paths.dashboard.product.devicelist,
          },
          { name: 'Edit Device Info' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DeviceNewEditForm
        currentUser={dataUser}
        batchid={batchid}
        client={client}
        productcode={productcode}
      />
    </Container>
  );
}

DeviceEditView.propTypes = {
  id: PropTypes.string,
  batchid: PropTypes.array,
  client: PropTypes.array,
  productcode: PropTypes.array,
};
