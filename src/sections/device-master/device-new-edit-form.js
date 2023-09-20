import PropTypes from 'prop-types';
import * as Yup from 'yup';
// eslint-disable-next-line import/no-duplicates
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// eslint-disable-next-line import/no-duplicates
import { useEffect } from 'react';

// @mui
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete, RHFSelect } from 'src/components/hook-form';
import axios from 'src/utils/axios';
// ----------------------------------------------------------------------

export default function DeviceNewEditForm({ currentUser, batchid, client, productcode }) {
  const router = useRouter();
  const [active, setActive] = useState(
    currentUser ? new Date(currentUser?.activation_date) : new Date()
  );
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    device_qr_code: Yup.string().required('Device_QR_Code is required'),
    product_code: Yup.string().required('Product_Code is required'),
    production_batch_no: Yup.string().required('Production_Batch_No is required'),
    mac_id: Yup.string().required('MAC_ID is required'),
    imei_no: Yup.string().required('IMEI_No is required'),
    qc_passed: Yup.string().required('QC_Passed is required'),
    qc_ledger_no: Yup.string().required('QC_Ledger_No is required'),
    qc_sub_ledger_no: Yup.string().required('QC_Sub_Ledger_No is required'),
    activation_code: Yup.string().required('Activation_Code is required'),
    activation_date: Yup.mixed().nullable(),
    api_cloud_url: Yup.string().required('API_Cloud_URL is required'),
    redirect_url: Yup.string().required('Redirect_URL is required'),
    client: Yup.string().required('Client is required'),
    // status: Yup.string().required('Status is required'),
  });

  // const defaultValues = useMemo(() => {
  //   const statusMapping = {
  //     0: 'Inactive',
  //     1: 'Active',
  //     2: 'Issued',
  //     3: 'Maintenance',
  //     4: 'Breakdown',
  //   };

  //   return {
  //     device_qr_code: currentUser?.device_qr_code || '',
  //     product_code: currentUser?.product_code || '',
  //     production_batch_no: currentUser?.production_batch_no || '',
  //     mac_id: currentUser?.mac_id || '',
  //     imei_no: currentUser?.imei_no || '',
  //     qc_passed: currentUser?.qc_passed || '',
  //     qc_ledger_no: currentUser?.qc_ledger_no || '',
  //     qc_sub_ledger_no: currentUser?.qc_sub_ledger_no || '',
  //     activation_code: currentUser?.activation_code || '',
  //     activation_date: currentUser?.activation_date || new Date(),
  //     api_cloud_url: currentUser?.api_cloud_url || '',
  //     redirect_url: currentUser?.redirect_url || '',
  //     client: currentUser?.client || '',
  //     status: currentUser?.status || 1,
  //   };
  // }, [currentUser]);

  const defaultValues = useMemo(
    () => ({
      device_qr_code: currentUser?.device_qr_code || '',
      product_code: currentUser?.product_code || '',
      production_batch_no: currentUser?.production_batch_no || '',
      mac_id: currentUser?.mac_id || '',
      imei_no: currentUser?.imei_no || '',
      qc_passed: currentUser?.qc_passed || '',
      qc_ledger_no: currentUser?.qc_ledger_no || '',
      qc_sub_ledger_no: currentUser?.qc_sub_ledger_no || '',
      activation_code: currentUser?.activation_code || '',
      activation_date: currentUser?.activation_date || new Date(),
      api_cloud_url: currentUser?.api_cloud_url || '',
      redirect_url: currentUser?.redirect_url || '',
      client: currentUser?.client || '',
      status: currentUser?.status || '',
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
    console.log(currentUser);
    if (currentUser?._id) setUser(true);
    else setUser(false);
    // setValue('name', currentUser?.user_group_name || '');
    // setValue('description', currentUser?.user_group_description || '');
    // setValue('status', currentUser?.status === 1 ? 'Active' : 'InActive' || '');
  }, []);
  //   const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const statusMapping = {
      //   Active: 1,
      //   Inactive: 0,
      //   Issued: 2,
      //   Maintenance: 3,
      //   Breakdown: 4,
      // };
      // console.log(data);
      // const status = statusMapping[data.status] || 0;

      const newData = {
        device_qr_code: data.device_qr_code,
        product_code: data.product_code,
        production_batch_no: data.production_batch_no,
        mac_id: data.mac_id,
        imei_no: data.imei_no,
        qc_passed: data.qc_passed,
        qc_ledger_no: data.qc_ledger_no,
        qc_sub_ledger_no: data.qc_sub_ledger_no,
        activation_code: data.activation_code,
        activation_date: active,
        api_cloud_url: data.api_cloud_url,
        redirect_url: data.redirect_url,
        client: data.client,
        status: data.status,
      };

      console.log('newdata', newData);
      if (!user) {
        await axios.post('/api/product/device/create', newData);
      } else {
        await axios.post(`/api/product/device/update/${currentUser._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.devicelist);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const statuses = [
    { label: 'Active', value: 1},
    { label: 'Inactive', value: 0 },
    { label: 'Issued', value: 2 },
    { label: 'Maintenance', value: 3 },
    { label: 'Breakdown', value: 4 },
  ];

  const qcpassed = [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
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
            <RHFTextField name="device_qr_code" label="Device_QR_Code" />
            <RHFSelect fullWidth name="product_code" label="Product_code">
              {productcode.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.product_code}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              fullWidth
              name="production_batch_no"
              label="Production_Batch_No"
              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              // defaultValue={currentUser?.user_group_ref||""}
            >
              {batchid.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.batch_id}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="mac_id" label="MAC_ID" />
            <RHFTextField name="imei_no" label="IMEI_No" />
            <RHFSelect
              fullWidth
              name="qc_passed"
              label="QC_Passed"
              PaperPropsSx={{ textTransform: 'capitalize' }}
              // defaultValue={currentUser?.status || 1} // Set the value based on your condition
            >
              {qcpassed.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFTextField name="qc_ledger_no" label="QC_Ledger_No" />
            <RHFTextField name="qc_sub_ledger_no" label="QC_Sub_Ledger_No" />
            <RHFTextField name="activation_code" label="Activation_Code" />
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
            <RHFTextField name="api_cloud_url" label="API_Cloud_URL" />
            <RHFTextField name="redirect_url" label="Redirect_URL" />
            <RHFSelect
              fullWidth
              name="client"
              label="Client"
              // InputLabelProps={{ shrink: true }}
              PaperPropsSx={{ textTransform: 'capitalize' }}
              // defaultValue={currentUser?.user_group_ref||""}
            >
              {client.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.company_name}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect
              fullWidth
              name="status"
              label="Status"
              PaperPropsSx={{ textTransform: 'capitalize' }}
              // defaultValue={currentUser?.status || 1} // Set the value based on your condition
              // defaultValue={[1, 0, 2, 3, 4].includes(currentUser?.status) ? currentUser?.status : 1}
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
              {!currentUser ? 'Create Device' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

DeviceNewEditForm.propTypes = {
  currentUser: PropTypes.object,
  batchid: PropTypes.array,
  client: PropTypes.array,
  productcode: PropTypes.array,
};
