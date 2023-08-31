
import PropTypes from 'prop-types'
import * as Yup from 'yup'
// eslint-disable-next-line import/no-duplicates
import { useCallback, useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { fData } from 'src/utils/format-number'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
// assets
import { countries } from 'src/assets/data'
// components
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import { useSnackbar } from 'src/components/snackbar'

import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form'
import axios from 'src/utils/axios'

// ----------------------------------------------------------------------

export default function UserNewEditForm({ currentUser }) {
  const router = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required('User Email is required'),
    mobile: Yup.string().required('User Mobile is required'),
    password: Yup.string().required('Password is required'),
    status: Yup.string().required('Status is required'),
  })

  const defaultValues = useMemo(
    () => ({
      email: currentUser?.user_email || '',
      mobile: currentUser?.user_mobile || '',
      password: currentUser?.password || '',
      status: currentUser?.status === 1 ? 'Active' : 'InActive' || '',
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
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(currentUser?._id)
    if (currentUser?.user_email) setUser(true)
    else setUser(false)
    setValue('email', currentUser?.user_email || '')
    setValue('mobile', currentUser?.user_mobile || '')
    setValue('password', currentUser?.password || '')
    setValue('status', currentUser?.status === 1 ? 'Active' : 'InActive' || '')
  }, [currentUser, setValue])
  const values = watch()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        user_email: data.email,
        user_mobile: data.mobile,
        password: data.password,
        status: data.status === 'Active' ? 1 : 0
      }


      console.log("response");
      const response1 = await axios.post('/api/user/create', newData); // Calling the API endpoint

      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!')
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(paths.dashboard.user.new);
      console.log("success");

    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(error.error);

      console.error(error);
      router.push(paths.dashboard.user.new);
    }
  });
  const statuses = [{ label: 'Active', value: 'Active' }
    , { label: "Inactive", value: "InActive" }]
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

            <RHFAutocomplete
              name="status"
              label="Status"
              options={statuses.map((status) => status.label)}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              renderOption={(props, option) => {
                const { label } = statuses.filter(
                  (status) => status.label === option
                )[0]

                if (!label) {
                  return null
                }

                return (
                  <li {...props} key={label === "Active" ? 1 : 0}>

                    {label}
                  </li>
                )
              }}
            />


          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentUser ? 'Create New User2' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>

    </FormProvider>
  )
}

UserNewEditForm.propTypes = {
  currentUser: PropTypes.object,
}





