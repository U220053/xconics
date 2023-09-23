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

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import Grid from '@mui/material/Unstable_Grid2';

// utils
import MenuItem from '@mui/material/MenuItem';

// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// components

import { useSnackbar } from 'src/components/snackbar';

import FormProvider, { RHFTextField, RHFSelect } from 'src/components/hook-form';
import axios from 'src/utils/axios';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// ----------------------------------------------------------------------

export default function ZoneNewEditForm({ currentZone, userPer }) {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState(
    currentZone ? new Date(currentZone?.activation_date) : new Date()
  );
  const NewUserSchema = Yup.object().shape({
    area_name: Yup.string().required(),
    svg_tag: Yup.string().required(),
    floor: Yup.string().required(),
    zone_type: Yup.string().required(),
    zone_default_color_code: Yup.string().required(),
    zone_alert_color_code: Yup.string().required(),
    zone_gateway: Yup.string().required(),
    zone_remarks: Yup.string().required(),
    activation_date: Yup.mixed().nullable(),
    status: Yup.string().required(),
  });

  const defaultValues = useMemo(
    () => ({
      area_name: currentZone?.area_name || '',
      svg_tag: currentZone?.svg_tag || '',
      floor: currentZone?.floor._id || '',
      zone_type: currentZone?.zone_type || '',
      zone_default_color_code: currentZone?.zone_default_color_code || '',
      zone_alert_color_code: currentZone?.zone_alert_color_code || '',
      zone_gateway: currentZone?.zone_gateway || '',
      zone_remarks: currentZone?.zone_remarks || '',
      activation_date: currentZone?.activation_date || new Date(),
      status: currentZone?.status || '',
    }),
    [currentZone]
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

  const [zone, setZone] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  useEffect(() => {
    if (currentZone?.area_name) setZone(true);
    else setZone(false);
  }, []);

  const onFormChange = (data) => {
    setFormData(data);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        area_name: data.area_name,
        svg_tag: data.svg_tag,
        floor: data.floor,
        zone_type: data.zone_type,
        zone_default_color_code: data.zone_default_color_code,
        zone_alert_color_code: data.zone_alert_color_code,
        zone_gateway: data.zone_gateway,
        zone_remarks: data.zone_remarks,
        //  activation_date:data.activation_date,
        activation_date: active,
        status: data.status,
      };
      let response;
      if (!zone) {
        response = await axios.post('/api/location/zone/create', newData);
      } else {
        response = await axios.post(`/api/location/zone/update/${currentZone._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentZone ? 'Update success!' : 'Create success!');
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(paths.dashboard.location.zonelist);
    } catch (error) {}
    onFormChange(data);
  });

  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];

  const ztype = [
    { label: 'Hazardous', value: 'Hazardous' },
    { label: 'Danger', value: 'Danger' },
    { label: 'Restricted', value: 'Restricted' },
    { label: 'Safe', value: 'Safe' },
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
            <RHFTextField name="area_name" label="Area Name" />
            <RHFTextField name="svg_tag" label="SVG Tag" />
            <RHFSelect
              fullWidth
              name="floor"
              label="floor"
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {userPer.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.floor_name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              fullWidth
              name="zone_type"
              label="Zone Type"
              PaperPropsSx={{ textTransform: 'capitalize' }}
            >
              {ztype.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="zone_default_color_code" label="Zone default color code (HEX)" />
            <RHFTextField name="zone_alert_color_code" label="Zone alert color code (HEX)" />
            <RHFTextField name="zone_gateway" label="Zone Gateway" />
            <RHFTextField name="zone_remarks" label="Zone remark" />
            {/* <DatePicker
              // views={['day', 'month', 'year']}
              
              label="activation_date"
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
            /> */}
            <Box
  sx={{
    marginBottom: 2, // Adjust the value as needed
  }}
>
  <DatePicker
    label="activation_date"
    value={active}
    format="dd/MM/yyyy"
    onChange={(newValue) => {
      setActive(newValue);
    }}
    slotProps={{
      textField: {
        fullWidth: true,
      },
    }}
  />
</Box>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <RHFSelect
                fullWidth
                name="status"
                label="Status"
                PaperPropsSx={{ textTransform: 'capitalize' }}
                defaultValue={currentZone?.status || 1} // Set the value based on your condition
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </div>
          </Box>

          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentZone ? 'Create New Zone' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

ZoneNewEditForm.propTypes = {
  currentZone: PropTypes.object,
  userPer: PropTypes.object,
};
