import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo,useState } from 'react';
// utils
import Cookies from 'js-cookie';
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setCookie } from './utils';
// // ----------------------------------------------------------------------

// // NOTE:
// // We only build demo at basic level.
// // Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// // ----------------------------------------------------------------------
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}
// const initialState = {
//   // user: null,
//   loading: true,
//   accessToken: null,
// };

// const reducer = (state, action) => {
//   if (action.type === 'INITIAL') {
//     return {
//       loading: false,
//       user: action.payload.user,
//     };
//   }
//   if (action.type === 'LOGIN') {
//     return {
//       ...state,
//       accessToken:action.payload.accessToken,
//     };
//   }

//   if (action.type === 'LOGOUT') {
//     return {
//       ...state,
//       user: null,
//     };
//   }
//   return state;
// };

// // ----------------------------------------------------------------------

// const STORAGE_KEY = 'accessToken';

// export function AuthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const initialize = useCallback(async () => {
//     try {
//       const accessToken = sessionStorage.getItem(STORAGE_KEY);

//       if (accessToken && isValidToken(accessToken)) {
//         setSession(accessToken);

//         const response = await axios.get(endpoints.auth.me);

//         const { user } = response.data;

//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user,
//           },
//         });
//       } else {
//         dispatch({
//           type: 'INITIAL',
//           payload: {
//             user: null,
//           },
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       dispatch({
//         type: 'INITIAL',
//         payload: {
//           user: null,
//         },
//       });
//     }
//   }, []);

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // LOGIN
//   const login = useCallback(async (phone,email, password) => {
//     const data = {
//       phone,
//       email,
//       password,
//     };

//     const response = await axios.post(endpoints.auth.login, data);

//     const { result,status,newToken,message} = response.data;

//     setA(result.accessToken);

//     dispatch({
//       type: 'LOGIN',
//       payload: {
//         accessToken:result.accessToken,
//       },
//     });
//   }, []);

//   // LOGOUT
//   const logout = useCallback(async () => {
//     setSession(null);
//     dispatch({
//       type: 'LOGOUT',
//     });
//   }, []);

//   // ----------------------------------------------------------------------

//   const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

//   const status = state.loading ? 'loading' : checkAuthenticated;

//   const memoizedValue = useMemo(
//     () => ({
//       user: state.user,
//       method: 'jwt',
//       loading: status === 'loading',
//       authenticated: status === 'authenticated',
//       unauthenticated: status === 'unauthenticated',
//       //
//       login,
    
//       logout,
//     }),
//     [login, logout, state.user, status]
//   );

//   return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node,
// };

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'authToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authToken, setAuthToken] = useState('');
  const initialize = useCallback(async () => {
    try {
      const accessToken = Cookies.get(STORAGE_KEY);
      // verify the Token ? rmove previous tokens

      if (accessToken) {
        dispatch({
          type: 'INITIAL',
          payload: {
            user:"dfadadad",
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (payload) => {
  

    const response = await axios.post(endpoints.auth.login, payload);
    if(!response.data.status){
      throw new CustomError(response.data.message);
    }
    const { result, id } = response.data;
if(response.data.status&&response.data.newToken){
 
  setCookie(result.accessToken);}
   
    dispatch({
      type: 'LOGIN',
      payload: {
        user:response.data.result,
      },
    });
  }, []);

  
  // LOGOUT
  const logout = useCallback(async () => {
    setCookie(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
    }),
    [login, logout,state.user,status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
