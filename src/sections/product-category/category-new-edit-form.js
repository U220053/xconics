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
import Grid from '@mui/material/Unstable_Grid2'
// utils
import MenuItem from '@mui/material/MenuItem';
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
// components
import { useSnackbar } from 'src/components/snackbar'

import FormProvider, {
  RHFTextField,
  RHFSelect,
} from 'src/components/hook-form'
import axios from 'src/utils/axios'
// import { Select } from '@mui/base'

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function CategoryNewEditForm({ currentUser}) {

  const router = useRouter()
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Category Name is required'),
    description: Yup.string().required('Category Description is required'),
    status: Yup.number().required('Status is required'),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.category_name || '',
      description: currentUser?.category_description || '',
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
  const values = watch()

  useEffect(() => {
    if (currentUser?.category_name) setUser(true);
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
        category_name: data.name,
        category_description: data.description,
        status: data.status
      }
      console.log(data);
      let response;
      if (!user) {
        response = await axios.post('/api/product/category/create', newData);
      } else {
        response = await axios.post(`/api/product/category/update/${currentUser._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!')
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(response);
      router.push(paths.dashboard.product.category);
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
            <RHFTextField name="name" label="Category Name"  />
            <RHFTextField name="description" label="Category Description" />
{/* 
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
            </RHFSelect> */}


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
              {!currentUser ? 'Create New Category' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>

    </FormProvider>
  )
}

CategoryNewEditForm.propTypes = {
  currentUser: PropTypes.object
}