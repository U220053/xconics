import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

// routes
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';

// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import axios ,{ endpoints }from '../../../utils/axios';
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login ,setAuthToken,authToken} = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    backgroundColor: '#0080FF',
    transition: 'filter 0.3s ease',
    boxShadow: isHovered  ? '0px 0px 10px rgba(0, 0, 0, 0.5)' : 'none',
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email/Phone is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
  
      const payload={email:'',phone:'',password:data.password};
      if (/^\d+$/.test(data.email)) {
          payload.phone=data.email;
   } else {
       
        payload.email=data.email;
      
      }
  

        await login?.(payload);
      
      // if(response.data.status&&response.data.newToken){
      //   Cookies.set('authToken',`Bearer ${response.data.result.accessToken}`);
      //  console.log(authToken);
      // }
    
    
      router.replace(PATH_AFTER_LOGIN);
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Typography variant="h4">Login to your Dashboard</Typography>

    
    </Stack>
  );


  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="email" label="Email address/Phone number" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        // eslint-disable-next-line react/style-prop-object
        onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

        style={buttonStyle}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

    

      {renderForm}
    </FormProvider>
  );
}