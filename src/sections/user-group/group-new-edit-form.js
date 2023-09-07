import PropTypes from 'prop-types';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-duplicates
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-duplicates
import { useEffect } from 'react';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';
import axios from 'src/utils/axios';
// ----------------------------------------------------------------------

export default function GroupNewEditForm({ currentUser }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.user_group_name || '',

      description: currentUser?.user_group_description || '',
      status: currentUser?.status === 1 ? 'Active' : 'InActive' || '',
    }),
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [user, setUser] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(currentUser?._id);
    if (currentUser?.user_group_name) setUser(true);
    else setUser(false);
    setValue('name', currentUser?.user_group_name || '');
    setValue('description', currentUser?.user_group_description || '');
    setValue('status', currentUser?.status === 1 ? 'Active' : 'InActive' || '');
  }, [currentUser, setValue]);
//   const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        user_group_name: data.name,
        user_group_description: data.description,
        status: data.status === 'Active' ? 1 : 0,
      };

      if (!user) {
        await axios.post('/api/user/create/usergroup', newData);
      } else {
        await axios.post(`/api/user/update/usergroup/${currentUser._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.group);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  const statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'InActive' },
  ];
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
            <RHFTextField name="name" label="Group Name" />
            <RHFTextField name="description" label="Group Description" />

            <RHFAutocomplete
              name="status"
              label="Status"
              options={statuses.map((status) => status.label)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const { label } = statuses.filter((status) => status.label === option)[0];

                if (!label) {
                  return null;
                }

                return (
                  <li {...props} key={label === 'Active' ? 0 : 1}>
                    {label}
                  </li>
                );
              }}
            />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create Group' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

GroupNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};