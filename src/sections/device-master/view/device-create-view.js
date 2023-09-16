// @mui
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import axios from 'src/utils/axios'
// routes
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import DeviceNewEditForm from '../device-new-edit-form';

export default function DeviceCreateView() {
  const settings = useSettingsContext();
  const [batchid, setBatchid] = useState([])
  const [client,setClient] = useState([]);
  const [productcode,setProductcode] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  useEffect(() => {
    const fetchData = async () => {
      try{
      const batchresponse = await axios.get('api/product/batch')
      const clientresponse = await axios.get('api/client/customer');
      const productresponse = await axios.get('api/product');

      const newdata3 = JSON.parse(JSON.stringify(productresponse.data.data));
      const newproductdata= newdata3.map((item) => {
        return { id: item._id,product_code: item.product_code };

      });
      setProductcode(newproductdata);
      console.log(newproductdata);
      
      const newdata2 = JSON.parse(JSON.stringify(clientresponse.data.data));
      const newclientdata= newdata2.map((item) => {
        return { id: item._id,company_name: item.company_name };
      });
      setClient(newclientdata);

      const newdata = JSON.parse(JSON.stringify(batchresponse.data.data))
      const newbatchData = newdata.map((item) => {
        return { id: item._id, batch_id: item.batch_id }
      });
      setBatchid(newbatchData);

      setIsLoading(false);
    }catch(e){
      console.log('Error', e);
      setIsLoading(false);
    }
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
        heading="Create a new device info"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Device Master',
            href: paths.dashboard.product.devicelist,
          },
          { name: 'New device' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <DeviceNewEditForm batchid={batchid} client={client} productcode={productcode}/>
    </Container>
  );
}