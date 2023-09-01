

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
  console.log(`userGroup`, userGroup)
  const router = useRouter()
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    email: Yup.string().required('User Email is required'),
    mobile: Yup.string().required('User Mobile is required'),
    password: Yup.string().required('Password is required'),
    status: Yup.string().required('Status is required'),
    groupref: Yup.string(),
  })

  const defaultValues = useMemo(
    () => ({
      email: currentUser?.user_email || '',
      mobile: currentUser?.user_mobile || '',
      password: currentUser?.password || '',
      groupref: currentUser?.user_group_ref || '',
      status: currentUser?.status === 1 ? 'Active' : 'Inactive' || '',
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
  
      setValue('email', currentUser?.user_email || '')
      setValue('mobile', currentUser?.user_mobile || '')
      setValue('password', currentUser?.password || '')
      setValue('groupref', currentUser?.groupref || '')
      setValue('status', currentUser?.status === 1 ? 'Active' : 'Inactive' || '')
   

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
        status: data.status === 'Active' ? 1 : 0
      }

 console.log(newData);
      console.log("response");
       const respones=await axios.post('/api/user/create', newData); // Calling the API endpoint
 console.log(respones);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      // enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!')
      // await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(paths.dashboard.user.list);
  

    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar(error.error);

      console.error(error);

    }

    //   if (!user) {
    //     await axios.post('/api/user/create', newData);
    //   } else {
    //     await axios.post(`/api/user/update/${currentUser._id}`, newData);
    //   }
    //   await new Promise((resolve) => setTimeout(resolve, 500));
    //   reset();
    //   enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
    //   router.push(paths.dashboard.user.list);
    //   console.info('DATA', data);
    // } catch (error) {
    //   // console.error(error);
    // }
    onFormChange(data);
  });


  const statuses = [{ label: 'Active', value: 'Active' }
    , { label: "Inactive", value: "Inactive" }]


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

            {/* <RHFAutocomplete
                name="groupref"
                label="Group Ref"
                options={Array.isArray(dropdownData) ? dropdownData.map(item => item.user_group_ref) : []}
                getOptionLabel={option => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option}>
                    {option}
                  </MenuItem>
                )}
              /> */}

            {/* <RHFSelect
              name="groupref"
      
              label="Select Permission Group"
              InputLabelProps={{  }}
             

              {...userGroup.map((item) => (
                <MenuItem
                  
                >
                  // {item}
                </MenuItem>
              ))}
            /> */}

            <RHFSelect
              fullWidth
              name="groupref"
              label="Status"
              InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {
                userGroup.map((option) => <MenuItem key={option.id} value={option.id}>{option.group_name}</MenuItem>)
              }
            </RHFSelect>

         

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





