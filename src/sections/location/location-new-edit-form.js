import PropTypes from 'prop-types';
import * as Yup from 'yup';

import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect } from 'react';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// utils

import MenuItem from '@mui/material/MenuItem';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// components

import { useSnackbar } from 'src/components/snackbar';

import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';

import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function LocationNewEditForm({ currentLocation,client_manager_ref }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [active, setActive] = useState(
    currentLocation ? new Date(currentLocation?.activation_date) : new Date()
  );
  
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    // name: Yup.string(),
    // PersonName: Yup.string(),
    // PhoneNo: Yup.number(),
    // ContactEmail: Yup.string().email(),
    // address: Yup.string(),
    // City: Yup.string(),
    // State: Yup.string(),
    // Pin: Yup.number().min(6),
    // AdminEmail: Yup.string().email(),
    // AdminPhone: Yup.number(),

    // ActivationDate: Yup.mixed().nullable(),
    // TermExpDate: Yup.string(),

    // status: Yup.number(),
    locationName: Yup.string(),
locationType: Yup.string(),
lat: Yup.string(),
lang: Yup.string(),
activationDate: Yup.mixed().nullable(),
client: Yup.string(),
status: Yup.string(),

  });

  const defaultValues = useMemo(
    () => ({
    //   name: currentLocation?.company_name || '',
    //   PersonName: currentLocation?.contact_person_name || '',
    //   PhoneNo: currentLocation?.contact_phone_number || '',
    //   ContactEmail: currentLocation?.contact_email || '',
    //   address: currentLocation?.address || '',
    //   City: currentLocation?.city || '',
    //   State: currentLocation?.state || '',
    //   Pin: currentLocation?.pin || '',
    //   AdminEmail: currentLocation?.admin_email || '',
    //   AdminPhone: currentLocation?.admin_phone || '',
    locationName: currentLocation?.location_name || '',
    locationType: currentLocation?.location_type || '',
    lat: currentLocation?.lat || '',
    lang: currentLocation?.lang || '',
    activation_date: currentLocation?.activation_date || new Date(),
    client: currentLocation?.client?._id || '',
    status: currentLocation?.status || '',
    
    }),
    [currentLocation]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [location, setLocation] = useState(false);
 
  useEffect(() => {
    if (currentLocation?._id) setLocation(true);
    else setLocation(false);
  }, []);
  const values = watch();
  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        // company_name: data.name,

        // contact_person_name: data.PersonName,
        // contact_phone_number: data.PhoneNo,
        // contact_email: data.ContactEmail,
        // address: data.address,
        // city: data.City,
        // state: data.State,
        // pin: data.Pin,
        // admin_email: data.AdminEmail,
        // admin_phone: data.AdminPhone,

       location_name:data.locationName,
      location_type:data.locationType,
      lat:data.lat,
       lang:data.lang,
// activation_date:data.activationDate,
activation_date:active,
client:data.client,
status:data.status,

        data,
      };

      if (!location) {
        await axios.post('/api/location/create', newData);
      } else {
        await axios.post(`/api/location/update/${currentLocation._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentLocation ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.location.list);
    } catch (error) {
      setIsLoading(false);
    }
    onFormChange(data);
  });
  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];
  const loc_type = [
    { label: 'Depot', value: 'Depot' },
    { label: 'Factory', value: 'Factory' },
    { label: 'Port', value: 'Port' },
    { label: 'Warehouse', value: 'Warehouse' },
    { label: 'Construction Site', value: 'Mines' },
    // Depot/Factory/Port/Warehouse/Construction Site/Mines
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
               
              <RHFTextField name="locationName" label="Location Name" />
             
              <RHFSelect
                fullWidth
                name="locationType" label="Location Type"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentLocation?.status || 1} 
              >
                {loc_type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFTextField name="lat" label="Latitude" />
              <RHFTextField name="lang" label="Longitude" />
              <DatePicker
              // views={['day', 'month', 'year']}
              label="Activation_Date"
              value={active}
              format="dd/MM/yyyy"
              onChange={(newValue) => {
                setActive(newValue);
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: 'normal',
                },
              }}
            />
              {/* <DatePicker
              name="activationDate"
                label="Activation Date"
                onChange={(newValue) => {
                   setActive(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              /> */}
              {/* <RHFTextField name="client" label="Client" /> */}
             
              <RHFSelect
                fullWidth
                name="client" label="Client"
               
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                {client_manager_ref.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_manager_ref}
                  </MenuItem>
                ))}
              </RHFSelect>
             
              

              <RHFSelect
                fullWidth
                name="status"
                label="status"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentLocation?.status || 1} 
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
              {!currentLocation ? 'Create location' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

LocationNewEditForm.propTypes = {
  currentLocation: PropTypes.object,
  client_manager_ref: PropTypes.array,
};
