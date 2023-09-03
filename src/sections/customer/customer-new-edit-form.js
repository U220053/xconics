// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// import { useCallback, useMemo } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';
// // utils
// import { fData } from 'src/utils/format-number';
// // routes
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// // assets
// import { countries } from 'src/assets/data';
// // components
// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, {
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadAvatar,
//   RHFAutocomplete,
// } from 'src/components/hook-form';

// // ----------------------------------------------------------------------

// export default function UserNewEditForm({ currentUser }) {
//   const router = useRouter();

//   const { enqueueSnackbar } = useSnackbar();

//   const NewUserSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     phoneNumber: Yup.string().required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     country: Yup.string().required('Country is required'),
//     company: Yup.string().required('Company is required'),
//     state: Yup.string().required('State is required'),
//     city: Yup.string().required('City is required'),
//     role: Yup.string().required('Role is required'),
//     zipCode: Yup.string().required('Zip code is required'),
//     avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
//     // not required
//     status: Yup.string(),
//     isVerified: Yup.boolean(),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentUser?.name || '',
//       city: currentUser?.city || '',
//       role: currentUser?.role || '',
//       email: currentUser?.email || '',
//       state: currentUser?.state || '',
//       status: currentUser?.status || '',
//       address: currentUser?.address || '',
//       country: currentUser?.country || '',
//       zipCode: currentUser?.zipCode || '',
//       company: currentUser?.company || '',
//       avatarUrl: currentUser?.avatarUrl || null,
//       phoneNumber: currentUser?.phoneNumber || '',
//       isVerified: currentUser?.isVerified || true,
//     }),
//     [currentUser]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewUserSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const values = watch();

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       reset();
//       enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
//       router.push(paths.dashboard.user.list);
//       console.info('DATA', data);
//     } catch (error) {
//       console.error(error);
//     }
//   });

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const file = acceptedFiles[0];

//       const newFile = Object.assign(file, {
//         preview: URL.createObjectURL(file),
//       });

//       if (file) {
//         setValue('avatarUrl', newFile, { shouldValidate: true });
//       }
//     },
//     [setValue]
//   );

//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid container spacing={3}>
//         <Grid xs={12} md={4}>
//           <Card sx={{ pt: 10, pb: 5, px: 3 }}>
//             {currentUser && (
//               <Label
//                 color={
//                   (values.status === 'active' && 'success') ||
//                   (values.status === 'banned' && 'error') ||
//                   'warning'
//                 }
//                 sx={{ position: 'absolute', top: 24, right: 24 }}
//               >
//                 {values.status}
//               </Label>
//             )}

//             <Box sx={{ mb: 5 }}>
//               <RHFUploadAvatar
//                 name="avatarUrl"
//                 maxSize={3145728}
//                 onDrop={handleDrop}
//                 helperText={
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       mt: 3,
//                       mx: 'auto',
//                       display: 'block',
//                       textAlign: 'center',
//                       color: 'text.disabled',
//                     }}
//                   >
//                     Allowed *.jpeg, *.jpg, *.png, *.gif
//                     <br /> max size of {fData(3145728)}
//                   </Typography>
//                 }
//               />
//             </Box>

//             {currentUser && (
//               <FormControlLabel
//                 labelPlacement="start"
//                 control={
//                   <Controller
//                     name="status"
//                     control={control}
//                     render={({ field }) => (
//                       <Switch
//                         {...field}
//                         checked={field.value !== 'active'}
//                         onChange={(event) =>
//                           field.onChange(event.target.checked ? 'banned' : 'active')
//                         }
//                       />
//                     )}
//                   />
//                 }
//                 label={
//                   <>
//                     <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
//                       Banned
//                     </Typography>
//                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                       Apply disable account
//                     </Typography>
//                   </>
//                 }
//                 sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
//               />
//             )}

//             <RHFSwitch
//               name="isVerified"
//               labelPlacement="start"
//               label={
//                 <>
//                   <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
//                     Email Verified
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     Disabling this will automatically send the user a verification email
//                   </Typography>
//                 </>
//               }
//               sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
//             />

//             {currentUser && (
//               <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
//                 <Button variant="soft" color="error">
//                   Delete User
//                 </Button>
//               </Stack>
//             )}
//           </Card>
//         </Grid>

//         <Grid xs={12} md={8}>
//           <Card sx={{ p: 3 }}>
//             <Box
//               rowGap={3}
//               columnGap={2}
//               display="grid"
//               gridTemplateColumns={{
//                 xs: 'repeat(1, 1fr)',
//                 sm: 'repeat(2, 1fr)',
//               }}
//             >
//               <RHFTextField name="name" label="Full Name" />
//               <RHFTextField name="email" label="Email Address" />
//               <RHFTextField name="phoneNumber" label="Phone Number" />

//               <RHFAutocomplete
//                 name="country"
//                 label="Country"
//                 options={countries.map((country) => country.label)}
//                 getOptionLabel={(option) => option}
//                 isOptionEqualToValue={(option, value) => option === value}
//                 renderOption={(props, option) => {
//                   const { code, label, phone } = countries.filter(
//                     (country) => country.label === option
//                   )[0];

//                   if (!label) {
//                     return null;
//                   }

//                   return (
//                     <li {...props} key={label}>
//                       <Iconify
//                         key={label}
//                         icon={`circle-flags:${code.toLowerCase()}`}
//                         width={28}
//                         sx={{ mr: 1 }}
//                       />
//                       {label} ({code}) +{phone}
//                     </li>
//                   );
//                 }}
//               />

//               <RHFTextField name="state" label="State/Region" />
//               <RHFTextField name="city" label="City" />
//               <RHFTextField name="address" label="Address" />
//               <RHFTextField name="zipCode" label="Zip/Code" />
//               <RHFTextField name="company" label="Company" />
//               <RHFTextField name="role" label="Role" />
//             </Box>

//             <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//               <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//                 {!currentUser ? 'Create User' : 'Save Changes'}
//               </LoadingButton>
//             </Stack>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }

// UserNewEditForm.propTypes = {
//   currentUser: PropTypes.object,
// };

// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// // eslint-disable-next-line import/no-duplicates
// import { useCallback, useMemo, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // eslint-disable-next-line import/no-duplicates
// import { useEffect } from 'react';

// // @mui
// import LoadingButton from '@mui/lab/LoadingButton';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
// import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';
// // utils
// import { fData } from 'src/utils/format-number';
// // routes
// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// // assets
// import { countries } from 'src/assets/data';
// // components
// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, {
//   RHFSwitch,
//   RHFTextField,
//   RHFUploadAvatar,
//   RHFAutocomplete,
// } from 'src/components/hook-form';
// import axios from 'src/utils/axios';
// // ----------------------------------------------------------------------

// export default function CustomerNewEditForm({ currentUser }) {
//   const router = useRouter();

//   const { enqueueSnackbar } = useSnackbar();

//   const NewUserSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     description: Yup.string().required('Description is required'),
//     status: Yup.string().required('Status is required'),
//   });

//   const defaultValues = useMemo(
//     () => ({
//       name: currentUser?.user_group_name || '',

//       description: currentUser?.user_group_description || '',
//       status: currentUser?.status === 1 ? 'Active' : 'InActive' || '',
//     }),
//     [currentUser]
//   );

//   const methods = useForm({
//     resolver: yupResolver(NewUserSchema),
//     defaultValues,
//   });

//   const {
//     reset,
//     watch,
//     control,
//     setValue,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;

//   const [user, setUser] = useState(false);
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     console.log(currentUser?._id);
//     if (currentUser?.user_group_name) setUser(true);
//     else setUser(false);
//     setValue('name', currentUser?.user_group_name || '');
//     setValue('description', currentUser?.user_group_description || '');
//     setValue('status', currentUser?.status === 1 ? 'Active' : 'InActive' || '');
//   }, [currentUser, setValue]);
//   const values = watch();

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const newData = {
//         user_group_name: data.name,
//         user_group_description: data.description,
//         status: data.status === 'Active' ? 1 : 0,
//       };

//       if (!user) {
//         await axios.post('/api/user/create/usergroup', newData);
//       } else {
//         await axios.post(`/api/user/update/usergroup/${currentUser._id}`, newData);
//       }
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       reset();
//       enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
//       router.push(paths.dashboard.customer.list);
//       console.info('DATA', data);
//     } catch (error) {
//       console.error(error);
//     }
//   });
//   const statuses = [
//     { label: 'Active', value: 'Active' },
//     { label: 'Inactive', value: 'InActive' },
//   ];
//   return (
//     <FormProvider methods={methods} onSubmit={onSubmit}>
//       <Grid xs={12} md={8}>
//         <Card sx={{ p: 3 }}>
//           <Box
//             rowGap={3}
//             columnGap={2}
//             display="grid"
//             gridTemplateColumns={{
//               xs: 'repeat(1, 1fr)',
//               sm: 'repeat(2, 1fr)',
//             }}
//           >
//             <RHFTextField name="name" label="Customer Name" />
//             <RHFTextField name="description" label="Customer Description" />

//             <RHFAutocomplete
//               name="status"
//               label="Status"
//               options={statuses.map((status) => status.label)}
//               getOptionLabel={(option) => option}
//               isOptionEqualToValue={(option, value) => option === value}
//               renderOption={(props, option) => {
//                 const { label } = statuses.filter((status) => status.label === option)[0];

//                 if (!label) {
//                   return null;
//                 }

//                 return (
//                   <li {...props} key={label === 'Active' ? 0 : 1}>
//                     {label}
//                   </li>
//                 );
//               }}
//             />
//           </Box>

//           <Stack alignItems="flex-end" sx={{ mt: 3 }}>
//             <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
//               {!currentUser ? 'Create Customer' : 'Save Changes'}
//             </LoadingButton>
//           </Stack>
//         </Card>
//       </Grid>
//     </FormProvider>
//   );
// }

// CustomerNewEditForm.propTypes = {
//   currentUser: PropTypes.object,
// };

//**************************************************************** 287*/
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
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function CustomerNewEditForm({ currentCustomer }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    PersonName: Yup.string().required('Contact Person Name is required'),
    PhoneNo: Yup.number().required('Contact Phone No is required'),
    ContactEmail: Yup.string().email().required('Contact Email is required'),
    address: Yup.string().required('Address is required'),
    City: Yup.string().required('City is required'),
    State: Yup.string().required('State is required'),
    Pin: Yup.number().min(6).required('Pin is required'),
    AdminEmail: Yup.string().email().required('Admin Email is required'),
    AdminPhone: Yup.number().required(' Admin Phone No. is required'),
    // AdminPassword: Yup.string().required('Admin Password is required'),
    ActivationDate: Yup.string().required('Activation Date is required'),
    TermExpDate: Yup.string().required('Term Exp. Date is required'),
    ClientManagerName: Yup.string().required('Client Manager Name is required'),
    ClientManagerAttachDate: Yup.string().required('Client Manager Attach Date is required'),
    SelectGroup: Yup.string().required('Select Group is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentCustomer?.customer_group_name || '',
      PersonName: currentCustomer?.customer_person_name || '',
      PhoneNo: currentCustomer?.customer_phone || '',
      ContactEmail: currentCustomer?.customer_contact_email || '',
      address: currentCustomer?.customer_address || '',
      City: currentCustomer?.customer_city || '',
      State: currentCustomer?.customer_state || '',
      Pin: currentCustomer?.customer_pin || '',
      AdminEmail: currentCustomer?.customer_admin_email || '',
      AdminPhone: currentCustomer?.customer_admin_phone || '',
      ActivationDate: currentCustomer?.customer_activation_date || '',
      TermExpDate: currentCustomer?.customer_term_exp_date || '',
      ClientManagerName: currentCustomer?.customer_client_ || '',
      ClientManagerAttachDate: currentCustomer?.customer_client_date || '',
      SelectGroup: currentCustomer?.customer_select_group || '',
      // description: currentCustomer?.user_group_description || '',
      status: currentCustomer?.status === 1 ? 'Active' : 'Inactive' || '',
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
  useEffect(async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getGroupData();
    console.log(currentCustomer?._id);
    if (currentCustomer?.customer_group_name) setCustomer(true);
    else setCustomer(false);
    setValue('name', currentCustomer?.customer_group_name || '');
    // setValue('description', currentCustomer?.user_group_description || '');
    setValue('PersonName', currentCustomer?.customer_person_name || '');
    setValue('PhoneNo', currentCustomer?.customer_phone || '');
    setValue('ContactEmail', currentCustomer?.customer_contact_email || '');
    setValue('address', currentCustomer?.customer_address || '');
    setValue('City', currentCustomer?.customer_city || '');
    setValue('State', currentCustomer?.customer_state || '');
    setValue('Pin', currentCustomer?.customer_pin || '');
    setValue('AdminEmail', currentCustomer?.customer_admin_email || '');
    setValue('AdminPhone', currentCustomer?.customer_admin_phone || '');
    setValue('ActivationDate', currentCustomer?.customer_activation_date || '');
    setValue('TermExpDate', currentCustomer?.customer_term_exp_date || '');
    setValue('ClientManagerName', currentCustomer?.customer_client_ || '');
    setValue('ClientManagerAttachDate', currentCustomer?.customer_client_date || '');
    setValue('SelectGroup', currentCustomer?.customer_select_group || '');
    setValue('status', currentCustomer?.status === 1 ? 'Active' : 'Inactive' || '');
    console.log('select group', currentCustomer);
  }, [currentCustomer, setValue]);
  const values = watch();

  const getGroupData = async () => {
    axios
      .get('/api/user/usergroups') // Replace with your API endpoint
      .then((response) => {
        console.log(response.data.data);
        setGroupData(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching dropdown data:', error);
      });
  };

  const onFormChange = (data) => {
    setFormData(data);
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('clicked 1');
      const newData = {
        customer_group_name: data.name,
        // user_group_description: data.description,
        customer_person_name: data.PersonName,
        customer_phone: data.PhoneNo,
        customer_contact_email: data.ContactEmail,
        customer_address: data.address,
        customer_city: data.City,
        customer_state: data.State,
        customer_pin: data.Pin,
        customer_admin_email: data.AdminEmail,
        customer_admin_phone: data.AdminPhone,
        customer_activation_date: data.ActivationDate,
        customer_term_exp_date: data.TermExpDate,
        customer_client_: data.ClientManagerName,
        customer_client_date: data.ClientManagerAttachDate,
        customer_select_group: data.SelectGroup,
        status: data.status === 'Active' ? 1 : 0,
      };
      console.log({ newData });
      if (!customer) {
        await axios.post('/api/customer/create', newData);
      } else {
        await axios.post(`/api/customer/update/${currentCustomer._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentCustomer ? 'Update success!' : 'Create success!');
      console.log('clicked 2');
      router.push(paths.dashboard.customer.list);
      console.log('clicked 3');
      console.info('DATA', data);
    } catch (error) {
      // console.error(error);
    }
    onFormChange(data);
  });
  const statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];
  const clientmanager = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];
  // const obj ={}
  // document.querySelectorAll("RHFTextField".forEach(e) => {
  //   obj[e.name]= e.value
  // }
  // )
  const handleLogData = () => {
    console.log('Form Data:', formData);
  };
  // const [dropdownData, setDropdownData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  // useEffect(() => {
  //   // Make an API request to fetch the data
  //   // Replace 'yourApiEndpoint' with your actual API endpoint
  //   fetch('/api/user/usergroups')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Assuming your API response contains an array of group objects
  //       setGroupData(data.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('/api/user/usergroups') // Replace with your API endpoint
  //     .then((response) => {
  //       console.log(response.data.data);
  //       setGroupData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching dropdown data:', error);
  //     });
  // }, []);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: 'true' });
      }
    },
    [setValue]
  );
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
            <Box sx={{ mb: 2 }}>
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
            </Box>
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Activation Date" />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Term Exp. Date" />
              </LocalizationProvider>

              {/* <RHFAutocomplete
                name="ClientManagerName"
                label="Client Manager Name"
                options={clientmanager.map((number2) => number2.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { label } = clientmanager.filter((status) => status.label === option)[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label === 'Yes' ? 0 : 1}>
                      {label}
                    </li>
                  );
                }}
              /> */}
              <RHFSelect
                native
                name="ClientManagerName"
                label="Client Manager Name"
                InputLabelProps={{ shrink: true }}
              >
                {clientmanager.map((number2) => (
                  <option key={number2.label} value={number2.label}>
                    {number2.label}
                  </option>
                ))}
              </RHFSelect>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker name="ClientManagerAttachDate" label="Client Manager Attach Date" />
              </LocalizationProvider>

              <RHFSelect
                native
                name="SelectGroup"
                label="Select Group"
                InputLabelProps={{ shrink: true }}
              >
                {groupData.map((group) => (
                  <option key={group.user_group_name} value={group.user_group_name}>
                    {group.user_group_name}
                  </option>
                ))}
              </RHFSelect>

              {/* <RHFAutocomplete
                name="SelectGroup"
                label="Select Group"
                options={
                  Array.isArray(groupData) ? groupData.map((item) => item.user_group_name) : []
                }
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option}>
                    {option}
                  </MenuItem>
                )}
              /> */}

              <RHFSelect native name="status" label="Status" InputLabelProps={{ shrink: true }}>
                {statuses.map((status) => (
                  <option key={status.label} value={status.label}>
                    {status.label}
                  </option>
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
  userGroup: PropTypes.object,
};
