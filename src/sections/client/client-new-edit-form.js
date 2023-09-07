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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// utils
import { TextField } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';

import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
// import TextField from '@mui/material/TextField'
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect,
} from 'src/components/hook-form';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'src/utils/axios';
import PickerDate from 'src/sections/_examples/mui/picker-view/picker-date.js';

// ----------------------------------------------------------------------

export default function ClientNewEditForm({ currentClient, userGroup, client_manager_ref }) {

  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [active, setActive] = useState(new Date());
  const [active1, setActive1] = useState(new Date());
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
    name: Yup.string(),
    PersonName: Yup.string(),
    PhoneNo: Yup.number(),
    ContactEmail: Yup.string(),
    address: Yup.string(),
    City: Yup.string(),
    State: Yup.string(),
    Pin: Yup.number(),
    AdminEmail: Yup.string(),
    AdminPhone: Yup.number(),
    
    ActivationDate: Yup.mixed().nullable(),
    TermExpDate: Yup.string(),
  
    status: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentClient?.company_name || '',
      PersonName: currentClient?.contact_person_name || '',
      PhoneNo: currentClient?.contact_phone_number || '',
      ContactEmail: currentClient?.contact_email || '',
      address: currentClient?.address || '',
      City: currentClient?.city || '',
      State: currentClient?.state || '',
      Pin: currentClient?.pin || '',
      AdminEmail: currentClient?.admin_email || '',
      AdminPhone: currentClient?.admin_phone || '',
    //   ActivationDate: currentClient?.activation_date || '',
    //   TermExpDate: currentClient?.term_exp_date || '',
    //  Status:currentClient?.status||'',
     
    }),
    [currentClient]
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

  const [client, setClient] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  useEffect(() => {
    
    if (currentClient?.company_name) setClient(true);
    else setClient(false);
  }, []);
  const values = watch();
  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
    
      const newData = {
        company_name: data.name,
       
        contact_person_name: data.PersonName,
        contact_phone_number: data.PhoneNo,
        contact_email: data.ContactEmail,
        address: data.address,
        city: data.City,
        state: data.State,
        pin: data.Pin,
        admin_email: data.AdminEmail,
        admin_phone: data.AdminPhone,
        
        
        // status: data.status,
        
        data,
        // activation_date: active,
        // term_exp_date: active1,
      };
      console.log(newData);

      if (!client) {
        await axios.post('/api/client/manager/create', newData);
      } else {
        await axios.post(`/api/client/manager/edit/${currentClient._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentClient ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.client.list);

      console.info('DATA', data);
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

  const handleLogData = () => {
    console.log('Form Data:', formData);
  };
 
 
  
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
            {/* <Box sx={{ mb: 2 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box> */}
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Company Name" />
              <RHFTextField name="PersonName" label="Contact Person Name" />
              <RHFTextField name="PhoneNo" label="Contact Phone No" />
              <RHFTextField name="ContactEmail" label="Contact Email" />
              <RHFTextField name="address" label="Address" placeholder="Address" multiline />
              <RHFTextField name="City" label="City" />
              <RHFTextField name="State" label="State" />
              <RHFTextField name="Pin" label="Pin" />
              <RHFTextField name="AdminEmail" label="Admin Email" />
              <RHFTextField name="AdminPhone" label="Admin Phone" />

              {/* <DatePicker
        
          label="Year only"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              margin: 'normal',
            },
          }}
        /> */}
              <DatePicker
            
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
              />
              <DatePicker
                
                label="Term Exp Date"
                
                onChange={(newValue) => {
                  setActive1(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />


             

              <RHFSelect
                fullWidth
                name="status"
                label="Status"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentClient?.status || 1} // Set the value based on your condition
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
              {!currentClient ? 'Create Client' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

ClientNewEditForm.propTypes = {
  currentClient: PropTypes.object,
 
};
