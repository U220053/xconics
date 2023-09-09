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

export default function ClientNewEditForm({ currentClient }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [active, setActive] = useState(new Date());
  const [active1, setActive1] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string(),
    PersonName: Yup.string(),
    PhoneNo: Yup.number(),
    ContactEmail: Yup.string().email(),
    address: Yup.string(),
    City: Yup.string(),
    State: Yup.string(),
    Pin: Yup.number().min(6),
    AdminEmail: Yup.string().email(),
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
    
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [client, setClient] = useState(false);
 
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

        data,
      };

      if (!client) {
        await axios.post('/api/client/manager/create', newData);
      } else {
        await axios.post(`/api/client/manager/update/${currentClient._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentClient ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.client.list);
    } catch (error) {
      setIsLoading(false);
    }
    onFormChange(data);
  });
  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
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
                defaultValue={currentClient?.status || 1} 
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
