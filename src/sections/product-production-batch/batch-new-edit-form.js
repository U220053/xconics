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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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

export default function BatchNewEditForm({ currentBatch }) {
  const router = useRouter();
  const [active, setActive] = useState(currentBatch?new Date(currentBatch?.batch_date):new Date());
  const [active1, setActive1] = useState(currentBatch?new Date(currentBatch?.batch_start_date):new Date());
  const [active2, setActive2] = useState(currentBatch?new Date(currentBatch?.batch_end_date):new Date());
  const { enqueueSnackbar } = useSnackbar();

  const NewBatchSchema = Yup.object().shape({
    batch_id: Yup.string().required('Id is required'),
    // batch_date: Yup.mixed().nullable(),
    // batch_start_date: Yup.mixed().nullable(),
    // batch_end_date: Yup.mixed().nullable(),
    status: Yup.string().required('Status is required'),
  });

  const defaultValues = useMemo(
    () => ({
      batch_id: currentBatch?.batch_id || '',
      // batch_date: currentBatch?.batch_date || new Date(),
      // batch_start_date: currentBatch?.batch_start_date || new Date(),
      // batch_end_date:currentBatch?.batch_end_date || new Date(),
      status: currentBatch?.status === 1 ? 'Active' : 'InActive' || '',
    }),
    [currentBatch]
  );

  const methods = useForm({
    resolver: yupResolver(NewBatchSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [batch, setBatch] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // console.log(currentBatch?.batch_date);
    // console.log(new Date())
    if (currentBatch?.batch_id) setBatch(true);
    else setBatch(false);
  }, []);
//   const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        batch_id: data.batch_id,
        batch_date: active,
        batch_start_date: active1,
        batch_end_date: active2,
        status: data.status === 'Active' ? 1 : 0,
      };

      if (!batch) {
        await axios.post('/api/product/batch/create', newData);
      } else {
        await axios.post(`/api/product/batch/update/${currentBatch._id}`, newData);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentBatch ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.batchlist);
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
            <RHFTextField name="batch_id" label="batch_id" />
            <DatePicker
                // views={['day', 'month', 'year']}
                label="Batch Date"
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
            <DatePicker
                // views={['day', 'month', 'year']}
                label="Batch startdate"
                value={active1}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  setActive1(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />
              <DatePicker
                // views={['day', 'month', 'year']}
                label="Batch enddate"
                value={active2}
                format="dd/MM/yyyy"
                onChange={(newValue) => {
                  setActive2(newValue);
                  console.log(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />
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
              {!currentBatch ? 'Create batch' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </FormProvider>
  );
}

BatchNewEditForm.propTypes = {
  currentBatch: PropTypes.object,
};