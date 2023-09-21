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
    area_name: Yup.string(),
    svg_tag: Yup.string(),
    floor: Yup.string(),
    zone_type: Yup.string(),
    zone_default_color_code: Yup.string(),
    zone_alert_color_code: Yup.string(),
    zone_gateway: Yup.string(),
    zone_remarks: Yup.string(),
    activation_date: Yup.mixed().nullable(),
    status: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      // name: currentGroup?.screen_name || '',
      // groupref: currentGroup?.user_group_ref || "",
      // status: currentGroup?.status || 1,
      // add: currentGroup?.add_permission || false,
      // delete: currentGroup?.delete_permission || false,
      // edit: currentGroup?.edit_permission || false,
      // export: currentGroup?.export_permission || false,
      // print: currentGroup?.print_permission || false,
      // enable: currentGroup?.enable_permission || false,
      area_name: currentZone?.area_name || '',
      svg_tag: currentZone?.svg_tag || '',
      floor: currentZone?.floor || '',
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

  // const [zone, setuserPer] = useState(false);
  // const [dropdownData, setdropdownData] = useState([]);

  // const values = watch();

  // useEffect(() => {
  //   if (currentGroup?.screen_name) setuserPer(true);
  //   else setuserPer(false);

  //   console.log(currentGroup);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
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
        response = await axios.post(`/api/location/zone/update/${currentZone.area_name}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentZone ? 'Update success!' : 'Create success!');
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(paths.dashboard.location.zonelist);
    } catch (error) {
      console.warn(error);
    }
    onFormChange(data);
  });

  const statuses = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];

  // " Hazardous" , "Danger", "Restricted", "Safe"

  const ztype = [
    { label: 'Hazardous', value: 'Hazardous' },
    { label: 'Danger', value: 'Danger' },
    { label: 'Restricted', value: 'Restricted' },
    { label: 'Safe', value: 'Safe' },
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
            <RHFTextField name="area_name" label="Area Name" />
            <RHFTextField name="svg_tag" label="SVG Tag" />
            <RHFSelect
              fullWidth
              name="floor_name"
              label="floor_name"
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
            <RHFTextField name="zone_default_color_code" label="zone_default_color_code" />
            <RHFTextField name="zone_alert_color_code" label="Zone_alert_color_code" />
            <RHFTextField name="zone_gateway" label="Zone Gateway" />
            <RHFTextField name="zone_remarks" label="Zone remark" />
            <DatePicker
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
            />
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
