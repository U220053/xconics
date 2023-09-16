import PropTypes from 'prop-types';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-duplicates
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-duplicates
import { useEffect } from 'react';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

// utils

import MenuItem from '@mui/material/MenuItem';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets

// components

import { useSnackbar } from 'src/components/snackbar';
// import TextField from '@mui/material/TextField'
import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function ProductNewEditForm({ currentProduct,  product_category }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // PersonName: Yup.string().required('Contact Person Name is required'),
    // PhoneNo: Yup.number().required('Contact Phone No is required'),
    // ContactEmail: Yup.string().email().required('Contact Email is required'),
    // address: Yup.string().required('Address is required'),
    // City: Yup.string().required('City is required'),
    // State: Yup.string().required('State is required'),
    // Pin: Yup.number().min(6).required('Pin is required'),
    // AdminEmail: Yup.string().email().required('Admin Email is required'),
    // AdminPhone: Yup.number().required(' Admin Phone No. is required'),
    // // AdminPassword: Yup.string().required('Admin Password is required'),
    // ActivationDate: Yup.string().required('Activation Date is required'),
    // TermExpDate: Yup.string().required('Term Exp. Date is required'),
    // ClientManagerName: Yup.string().required('Client Manager Name is required'),
    // ClientManagerAttachDate: Yup.string().required('Client Manager Attach Date is required'),
    // // SelectGroup: Yup.string().required('Select Group is required'),
    // groupref: Yup.string().required('Select Group is required'),
    // status: Yup.number().required('Status is required'),
    // name: Yup.string(),
    // PersonName: Yup.string(),
    // PhoneNo: Yup.number(),
    // ContactEmail: Yup.string(),
    // address: Yup.string(),
    // City: Yup.string(),
    // State: Yup.string(),
    // Pin: Yup.number(),
    // AdminEmail: Yup.string(),
    // AdminPhone: Yup.number(),
    // // AdminPassword: Yup.string().required('Admin Password is required'),
    // ActivationDate: Yup.mixed().nullable(),
    // TermExpDate: Yup.string(),
    // ClientManagerRef: Yup.string(),
    // ClientManagerAttachDate: Yup.string(),
    // // SelectGroup: Yup.string().required('Select Group is required'),
    // groupref: Yup.string(),
    // status: Yup.number(),
    ProductCode: Yup.string(),
    ProductVersion: Yup.string(),
    ProductCategory: Yup.string(),
    PrimaryMcu: Yup.string(),
    SecondaryMcu: Yup.string(),
    PrimaryComProtocol: Yup.string(),
    SecondaryComProtocol: Yup.string(),
    BatteryOperated: Yup.string(),

    PrimaryBattery: Yup.string(),
    SecondaryBattery: Yup.string(),
    OperatingVoltage: Yup.string(),
    InputVoltage: Yup.string(),
    PowerConsumption: Yup.string(),
    Enclosure: Yup.string(),
    ApiCloudURL: Yup.string(),
    PrimarySensor:Yup.string(),
    SecondarySensor:Yup.string(),
    Geolocation:Yup.string(),
    IndoorLocation:Yup.string(),
    Sensor:Yup.string(),
    Gateway:Yup.string(),
    Vision:Yup.string(),
    Description:Yup.string(),
    Status: Yup.number(),
    ProductName:Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      // name: currentProduct?.company_name || '',
      // PersonName: currentProduct?.contact_person_name || '',
      // PhoneNo: currentProduct?.contact_phone_no || '',
      // ContactEmail: currentProduct?.contact_email || '',
      // address: currentProduct?.address || '',
      // City: currentProduct?.city || '',
      // State: currentProduct?.state || '',
      // Pin: currentProduct?.pin || '',
      // AdminEmail: currentProduct?.admin_email || '',
      // AdminPhone: currentProduct?.admin_phone || '',
      // ActivationDate: currentProduct?.activation_date || '',
      // TermExpDate: currentProduct?.term_exp_date || '',
    //   // ClientManagerName: currentCustomer?.customer_client_ || '',
    //   ClientManagerAttachDate: currentProduct?.Product_client_date || '',
    //   SelectGroup: currentProduct?.customer_select_group || '',
    //   // description: currentCustomer?.user_group_description || '',
    //   // status: currentCustomer?.status === 1 ? 'Active' : 'Inactive' || '',
    //   groupref: currentCustomer?.user_group_ref || '',
    //   status: currentCustomer?.status || 1,
    //   client_manager_ref: currentCustomer?.client_manager_ref || '',
ProductCode:currentProduct?.product_code||'',
ProductName:currentProduct?.product_name,
ProductVersion:currentProduct?.product_version,
ProductCategory:currentProduct?.product_category,
PrimaryMcu:currentProduct?.primary_mcu,
SecondaryMcu:currentProduct?.secondary_mcu,
PrimaryComProtocol:currentProduct?.primary_com_protocol,
SecondaryComProtocol:currentProduct?.secondary_com_protocol,
BatteryOperated:currentProduct?.battery_operated,
PrimaryBattery:currentProduct?.primary_battery,
SecondaryBattery:currentProduct?.secondary_battery,
OperatingVoltage:currentProduct?.operating_voltage,
InputVoltage:currentProduct?.input_voltage,
PowerConsumption:currentProduct?.power_consumption,
Enclosure:currentProduct?.enclosure,
ApiCloudURL:currentProduct?.api_cloud_url,
PrimarySensor:currentProduct?.primary_sensor,
SecondarySensor:currentProduct?.secondary_sensor,
Geolocation:currentProduct?.geolocation,
IndoorLocation:currentProduct?.indoor_location,
Sensor:currentProduct?.sensor,
Gateway:currentProduct?.gateway,
Vision:currentProduct?.vision,
Description:currentProduct?.description,
Status:currentProduct?.status||1,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [product, setProduct] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  useEffect(() => {
    if (currentProduct?.company_name) setProduct(true);
    else setProduct(false);
  }, []);
  const values = watch();
  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        // company_name: data.name,
        // // user_group_description: data.description,
        // contact_person_name: data.PersonName,
        // contact_phone_no: data.PhoneNo,
        // contact_email: data.ContactEmail,
        // address: data.address,
        // city: data.City,
        // state: data.State,
        // pin: data.Pin,
        // admin_email: data.AdminEmail,
        // admin_phone: data.AdminPhone,
        // // activation_date: data.ActivationDate,
        // //  term_exp_date: data.TermExpDate,
        // // customer_client_: data.ClientManagerName,
        // // customer_client_date: data.ClientManagerAttachDate,
        // // customer_select_group: data.SelectGroup,
        // group_ref: data.groupref,
        // status: data.status,
        // client_manager_ref: data.client_manager_ref,
        // data,
        // activation_date: active,
        // term_exp_date: active1,

        product_code:data.ProductCode,
product_name:data.ProductName,
product_version:data.ProductVersion,
product_category:data.ProductCategory,
primary_mcu:data.PrimaryMcu,
secondary_mcu:data.SecondaryMcu,
primary_com_protocol:data.PrimaryComProtocol,
secondary_com_protocol:data.SecondaryComProtocol,
battery_operated:data.BatteryOperated,
primary_battery:data.PrimaryBattery,
secondary_battery:data.SecondaryBattery,
operating_voltage:data.OperatingVoltage,
input_voltage:data.InputVoltage,
power_consumption:data.PowerConsumption,
enclosure:data.Enclosure,
api_cloud_url:data.ApiCloudURL,
primary_sensor:data.PrimarySensor,
secondary_sensor:data.SecondarySensor,
geolocation:data.Geolocation,
indoor_location:data.IndoorLocation,
sensor:data.Sensor,
gateway:data.Gateway,
Vision:data.vision,
description:data.Description,
status:data.Status,
      };

      if (!product) {
        await axios.post('/api/product/create', newData);
      } else {
        await axios.post(`/api/product/update/${currentProduct._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProduct ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.product.masterlist);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    onFormChange(data);
  });
  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];
  const yesno = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ];
// BLE/GSM/LORA/LTE/WIFI
const comprotocol = [
  { label: 'BLE', value: 'BLE' },
  { label: 'GSM', value: 'GSM' },
  { label: 'LORA', value: 'LORA' },
  { label: 'LTE', value: 'LTE' },
  { label: 'WIFI', value: 'WIFI' },
];

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            container
            justify="flex-end"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="ProductCode" label="Product Code" />
              <RHFTextField name="ProductName" label="Product Name" />
              <RHFTextField name="ProductVersion" label="Product Version" />
              {/* <RHFTextField  /> */}
              {/* {client_manager_ref.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_manager_ref}
                  </MenuItem>
                ))} */}
                 <RHFSelect
                fullWidth
                name="ProductCategory" label="Product Category"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                // Set the value based on your condition
              >
               {product_category.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.product_category}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="SecondaryMcu" label="Secondary Mcu"  />
             
               <RHFSelect
                fullWidth
                name="PrimaryComProtocol" label="Primary Com Protocol"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentProduct?.Geolocation || 1} // Set the value based on your condition
              >
                {comprotocol.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name="SecondaryComProtocol" label="Secondary Com Protocol"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                // Set the value based on your condition
              >
                {comprotocol.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="BatteryOperated" label="Battery Operated" />
              <RHFTextField name="PrimaryBattery" label="Primary Battery" />
              <RHFTextField name="SecondaryBattery" label="Secondary Battery" />
              <RHFTextField name="OperatingVoltage" label="Operating Voltage" />  
              <RHFTextField name="InputVoltage" label="Input Voltage" />  
              <RHFTextField name="PowerConsumption" label="Power Consumption" /> 
               <RHFTextField name="Enclosure" label="Enclosure" /> 
                <RHFTextField name="ApiCloudURL" label="Api Cloud URL" />
                  <RHFTextField name="PrimarySensor" label="Primary Sensor" />  
                  <RHFTextField name="SecondarySensor" label="Secondary Sensor" />  
                  <RHFSelect
                fullWidth
                name="Geolocation"
                label="Geolocation"
                PaperPropsSx={{ textTransform: 'capitalize' }}
              // Set the value based on your condition
              >
                {yesno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name="IndoorLocation"
                label="Indoor Location"
                PaperPropsSx={{ textTransform: 'capitalize' }}
              // Set the value based on your condition
              >
                {yesno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name="Sensor"
                label="Sensor"
                PaperPropsSx={{ textTransform: 'capitalize' }}
               // Set the value based on your condition
              >
                {yesno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name="Gateway"
                label="Gateway"
                PaperPropsSx={{ textTransform: 'capitalize' }}
               // Set the value based on your condition
              >
                {yesno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFSelect
                fullWidth
                name="Vision"
                label="Vision"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                 // Set the value based on your condition
              >
                {yesno.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
                  {/* <RHFTextField name="Geolocation" label="Geolocation" /> 
                   <RHFTextField name="IndoorLocation" label="Indoor Location" />
                     <RHFTextField name="Sensor" label="Sensor" />
                       <RHFTextField name="Gateway" label="Gateway" /> 
                        <RHFTextField name="Vision" label="Vision" />   */}
                        <RHFTextField name="Description" label="Description" />
                        
              

              <RHFSelect
                fullWidth
                name="status"
                label="Status"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentProduct?.status || 1} // Set the value based on your condition
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Box>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentProduct ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
  product_category: PropTypes.array,
};
