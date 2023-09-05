import PropTypes from 'prop-types'
import * as Yup from 'yup'
// eslint-disable-next-line import/no-duplicates
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// eslint-disable-next-line import/no-duplicates
import { useEffect } from 'react'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
// utils
import MenuItem from '@mui/material/MenuItem';
import { fData } from 'src/utils/format-number'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
// assets
import { countries } from 'src/assets/data'
import { Option } from '@mui/base/Option';
// components
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import { useSnackbar } from 'src/components/snackbar'

import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form'
import axios from 'src/utils/axios'
import { Select } from '@mui/base'

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function UserNewEditForm({ currentUser, userGroup }) {

  const router = useRouter()
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required('User Email is required'),
    mobile: Yup.string().required('User Mobile is required'),
    password: Yup.string().required('Password is required'),
    status: Yup.number().required('Status is required'),
    groupref: Yup.string(),
  })

  const defaultValues = useMemo(
    () => ({
      email: currentUser?.user_email || '',
      mobile: currentUser?.user_mobile || '',
      password: currentUser?.password || '',
      groupref: currentUser?.user_group_ref || '',
      status: currentUser?.status || 1,
    }),
    [currentUser]
  )

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const [user, setUser] = useState(false)
  const [dropdownData, setdropdownData] = useState([]);


  const values = watch()

  useEffect(() => {
    if (currentUser?.user_email) setUser(true);
    else setUser(false);

    console.log(currentUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        user_email: data.email,
        user_mobile: data.mobile,
        password: data.password,
        user_group_ref: data.groupref,
        status: data.status
      }
      console.log(data);
      let response;
      if (!user) {
        response = await axios.post('/api/user/create', newData);
      } else {
        response = await axios.post(`/api/user/update/${currentUser._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!')
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(response);
      router.push(paths.dashboard.user.list);
    } catch (error) {
  console.error(error);
  }
    onFormChange(data);
  });


  const statuses = [{ label: 'Active', value: 1 }
    , { label: "Inactive", value: 0 }]


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
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="email" label="User Email" type="email" />
            <RHFTextField name="mobile" label="User Mobile" type="number" />
            <RHFTextField name="password" label="Password" />

            <RHFSelect
              // helperText= "Select Group"
              fullWidth
              name="groupref"
              label="Group"
              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              defaultValue={currentUser?.user_group_ref || ""}
            >
              {
                userGroup.map((option) => <MenuItem key={option.id} value={option.id}>{option.group_name}</MenuItem>)
              }
            </RHFSelect>


            <RHFSelect
              fullWidth
              name="status"
              label="Status"
              PaperPropsSx={{ textTransform: 'capitalize' }}
              defaultValue={currentUser?.status || 1} // Set the value based on your condition
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>

          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create New User' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>

    </FormProvider>
  )
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
  userGroup: PropTypes.object
}




