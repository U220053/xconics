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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

export default function CustomerNewEditForm({ currentCustomer, userGroup, client_manager_ref }) {
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
    // AdminPassword: Yup.string().required('Admin Password is required'),
    ActivationDate: Yup.mixed().nullable(),
    TermExpDate: Yup.string(),
    ClientManagerRef: Yup.string(),
    ClientManagerAttachDate: Yup.string(),
    // SelectGroup: Yup.string().required('Select Group is required'),
    groupref: Yup.string(),
    status: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCustomer?.company_name || '',
      PersonName: currentCustomer?.contact_person_name || '',
      PhoneNo: currentCustomer?.contact_phone_no || '',
      ContactEmail: currentCustomer?.contact_email || '',
      address: currentCustomer?.address || '',
      City: currentCustomer?.city || '',
      State: currentCustomer?.state || '',
      Pin: currentCustomer?.pin || '',
      AdminEmail: currentCustomer?.admin_email || '',
      AdminPhone: currentCustomer?.admin_phone || '',
      ActivationDate: currentCustomer?.activation_date || '',
      TermExpDate: currentCustomer?.term_exp_date || '',
      // ClientManagerName: currentCustomer?.customer_client_ || '',
      ClientManagerAttachDate: currentCustomer?.customer_client_date || '',
      SelectGroup: currentCustomer?.customer_select_group || '',
      // description: currentCustomer?.user_group_description || '',
      // status: currentCustomer?.status === 1 ? 'Active' : 'Inactive' || '',
      groupref: currentCustomer?.user_group_ref || '',
      status: currentCustomer?.status || 1,
      client_manager_ref: currentCustomer?.client_manager_ref || '',
    }),
    [currentCustomer]
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

  const [customer, setCustomer] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  useEffect(() => {
    if (currentCustomer?.company_name) setCustomer(true);
    else setCustomer(false);
  }, []);
  const values = watch();
  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        company_name: data.name,
        // user_group_description: data.description,
        contact_person_name: data.PersonName,
        contact_phone_no: data.PhoneNo,
        contact_email: data.ContactEmail,
        address: data.address,
        city: data.City,
        state: data.State,
        pin: data.Pin,
        admin_email: data.AdminEmail,
        admin_phone: data.AdminPhone,
        // activation_date: data.ActivationDate,
        //  term_exp_date: data.TermExpDate,
        // customer_client_: data.ClientManagerName,
        // customer_client_date: data.ClientManagerAttachDate,
        // customer_select_group: data.SelectGroup,
        group_ref: data.groupref,
        status: data.status,
        client_manager_ref: data.client_manager_ref,
        data,
        activation_date: active,
        term_exp_date: active1,
      };

      if (!customer) {
        await axios.post('/api/client/customer/create', newData);
      } else {
        await axios.post(`/api/client/customer/update/${currentCustomer._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentCustomer ? 'Update success!' : 'Create success!');

      router.push(paths.dashboard.customer.list);
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
  const clientmanager = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const [groupData, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

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
                // views={['day', 'month', 'year']}
                label="Activation Date"
                // value={active}
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
                // views={['day', 'month', 'year']}
                label="Term Exp Date"
                // value={active1}
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

              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Term Exp. Date" />
              </LocalizationProvider> */}

              <RHFSelect
                fullWidth
                name="client_manager_ref"
                label="client_manager_ref"
                // InputLabelProps={{ shrink: true }}
                PaperPropsSx={{ textTransform: 'capitalize' }}
                // defaultValue={currentUser?.user_group_ref||""}
              >
                {client_manager_ref.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.client_manager_ref}
                  </MenuItem>
                ))}
              </RHFSelect>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="ClientManagerAttachDate" label="Client Manager Attach Date" />
              </LocalizationProvider>

              <RHFSelect
                fullWidth
                name="status"
                label="Status"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentCustomer?.status || 1} // Set the value based on your condition
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
              {!currentCustomer ? 'Create Customer' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

CustomerNewEditForm.propTypes = {
  currentCustomer: PropTypes.object,
  userGroup: PropTypes.array,
  client_manager_ref: PropTypes.array,
};
