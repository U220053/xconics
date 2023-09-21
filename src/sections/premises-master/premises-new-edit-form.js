/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-duplicates
import { useCallback, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-duplicates
import { useEffect } from 'react';

// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
// utils
import MenuItem from '@mui/material/MenuItem';
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
import { Option } from '@mui/base/Option';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFSelect,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFCheckbox,
} from 'src/components/hook-form';
import axios from 'src/utils/axios';
import { Select } from '@mui/base';

// ----------------------------------------------------------------------

export default function PremisesNewEditForm({ currentPremises, userLoc }) {
  const router = useRouter();
  const [active, setActive] = useState(
    currentPremises ? new Date(currentPremises?.activation_date) : new Date()
  );
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    premises_name: Yup.string().required('premises_name is required'),
    premises_type: Yup.string().required('premises_type is required'),
    lat: Yup.string().required('lat is required'),
    lang: Yup.string().required('lang is required'),
    activation_date: Yup.mixed().nullable(),
    location: Yup.string().required('location is required'),
    status: Yup.number().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      premises_name: currentPremises?.premises_name || '',
      premises_type: currentPremises?.premises_type || '',
      status: currentPremises?.status || 1,
      lat: currentPremises?.lat || '',
      lang: currentPremises?.lang || '',
      activation_date: currentPremises?.activation_date || new Date(),
      location: currentPremises?.location || '',
    }),
    [currentPremises]
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

  const [preLoc, setPreLoc] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);

  const values = watch();

  useEffect(() => {
    if (currentPremises?.premises_name) setPreLoc(true);
    else setPreLoc(false);
    console.log(currentPremises);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        premises_name: data.premises_name,
        premises_type: data.premises_type,
        lat: data.lat,
        lang: data.lang,
        activation_date: active,
        location: data.location,
        status: data.status,
      };
      let response;
      if (!preLoc) {
        response = await axios.post('/api/location/premises/create', newData);
      } else {
        response = await axios.post(`/api/location/premises/update/${currentPremises._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentPremises ? 'Update success!' : 'Create success!');
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(response);
      router.push(paths.dashboard.location.premiseslist);
    } catch (error) {
      console.warn(error);
    }
    onFormChange(data);
  });

  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];

  const type = [
    { label: 'Building', value: 'Building' },
    { label: 'Factory Shed', value: 'Factory Shed' },
  ];
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
            <RHFTextField name="premises_name" label="premises_name" />
            <RHFSelect
              // helperText= "Select Group"
              // fullWidth
              name="premises_type"
              label="premises_type"
              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="lat" label="Latitude" />
            <RHFTextField name="lang" label="lang" />
            <RHFSelect
              fullWidth
              name="location"
              label="location"
              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {userLoc.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.location_name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              fullWidth
              name="status"
              label="Status"
              PaperPropsSx={{ textTransform: 'capitalize' }}
              defaultValue={currentPremises?.status || 1} // Set the value based on your condition
            >
              {statuses.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <DatePicker
              // views={['day', 'month', 'year']}
              label="Activation_Date"
              value={active}
              format="dd/MM/yyyy"
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
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentPremises ? 'Create Premises' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

PremisesNewEditForm.propTypes = {
  currentPremises: PropTypes.object,
  userLoc: PropTypes.object,
};
