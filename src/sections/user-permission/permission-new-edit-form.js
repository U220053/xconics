

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
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
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
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFCheckbox,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function PermissionNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const NewPermissionSchema = Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    screen_name: Yup.string().required('screen_name is required'),
    // status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // name: currentUser?.user_group_name || '',
      screen_name: currentUser?.screen_name || '',
      // status: currentUser?.Group_Name === 1 ? 'Active' : 'InActive' || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewPermissionSchema),
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

  const [user, setUser] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(currentUser?._id);
    if (currentUser?.user_group_ref) setUser(true);
    else setUser(false);
    // setValue('name', currentUser?.user_group_name || '');
    setValue('screen_name', currentUser?.screen_name || '');
    // setValue('status', currentUser?.Group_Name === 1 ? 'Active' : 'InActive' || '');
  }, [currentUser, setValue]);
  const values = watch();

  const [dropdowndata, setDropdowndata]= useState([]);

  useEffect(()=>{
    axios.get('/api/user/usergroups')
    .then(response=>{
      console.log(response.data.data)
      setDropdowndata(response.data.data);
    })
    .catch(error=>{
      console.error('error fetching dropdown error', error);
    });
  },[]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        // user_group_name: data.name,
        screen_name: data.screen_name,
        // status: data.status === 'Active' ? 1 : 0,
      };

      if (!user) {
        await axios.post('/api/user/permission', newData);
      } else {
        await axios.post(`/api/user/permission/get/${currentUser._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.permission);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  // const statuses = [
  //   { label: 'Active', value: 'Active' },
  //   { label: 'Inactive', value: 'InActive' },
  // ];
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >

            <RHFAutocomplete
              name="Selectgroup"
              label="Select group"
              options={Array.isArray(dropdowndata)? dropdowndata.map(item=>item.user_group_name):[]}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option}>{option}</MenuItem>
              )}
            />
            <RHFTextField name="screen_name" label="Screen Name" />
            <RHFCheckbox name="add" label="Add Permission" />
            <RHFCheckbox name="Edit" label="Edit Permission" />
            <RHFCheckbox name="delete" label="Delete Permission" />
            <RHFCheckbox name="export" label="Export Permission" />
            <RHFCheckbox name="print" label="Print Permission" />

          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create Permission' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

PermissionNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
