/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
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
  RHFCheckbox
} from 'src/components/hook-form'
import axios from 'src/utils/axios'
import { Select } from '@mui/base'

// ----------------------------------------------------------------------

export default function PermissionNewEditForm({ currentGroup, userPer }) {

  const router = useRouter()
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Group name is required'),
    add: Yup.boolean(),
    edit: Yup.boolean(),
    delete: Yup.boolean(),
    export: Yup.boolean(),
    print: Yup.boolean(),
    enable:Yup.boolean(),
    groupref: Yup.string(),
    status: Yup.number().required('Status is required'),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentGroup?.screen_name || '',
      groupref: currentGroup?.user_group_ref || "",
      status: currentGroup?.status || 1,
      add: currentGroup?.add_permission || false,
      delete: currentGroup?.delete_permission || false,
      edit: currentGroup?.edit_permission || false,
      export: currentGroup?.export_permission || false,
      print: currentGroup?.print_permission || false,
      enable: currentGroup?.enable_permission || false,
    }),
    [currentGroup]
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

  const [group, setuserPer] = useState(false)
  const [dropdownData, setdropdownData] = useState([]);


  const values = watch()

  useEffect(() => {
    if (currentGroup?.screen_name) setuserPer(true);
    else setuserPer(false);

    console.log(currentGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        screen_name: data.name,
        user_group_ref: data.groupref,
        status: data.status,
        add_permission: data.add,
        delete_permission: data.delete,
        edit_permission: data.edit,
        export_permission: data.export,
        print_permission: data.print,
        enable_permission:data.enable
      }
      console.log("DATA", data);
      console.log("New Data", newData);
      let response;
      if (!group) {
        response = await axios.post('/api/user/permission/create', newData);
      } else {
        response = await axios.post(`/api/user/permission/update/${currentGroup._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentGroup ? 'Update success!' : 'Create success!')
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(response);
      router.push(paths.dashboard.user.permission);
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
            <RHFTextField name="name" label="Screen Name" />


            <RHFSelect
              // helperText= "Select Group"
              // fullWidth
              name="groupref"
              label="Select Group"

              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              defaultValue={currentGroup?.user_group_ref || ""}
            >
              {
                userPer.map((option) => <MenuItem key={option.id} value={option.id}>{option.group_name}</MenuItem>)
              }
            </RHFSelect>


            <RHFSelect
              fullWidth
              name="status"
              label="Status"
              PaperPropsSx={{ textTransform: 'capitalize' }}
              defaultValue={currentGroup?.status || 1} // Set the value based on your condition
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>


            <RHFCheckbox name="add" label="Add Permission" />
            <RHFCheckbox name="edit" label="Edit Permission" />
            <RHFCheckbox name="delete" label="Delete Permission" />
            <RHFCheckbox name="export" label="Export Permission" />
            <RHFCheckbox name="print" label="Print Permission" />
            <RHFCheckbox name="enable" label="Enable Permission" />
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentGroup ? 'Create New Permission' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>

    </FormProvider>
  )
}

PermissionNewEditForm.propTypes = {
  currentGroup: PropTypes.object,
  userPer: PropTypes.object
}
