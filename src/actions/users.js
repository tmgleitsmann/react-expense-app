import axios from 'axios';
//import store from '../store/configureStore';
const apiUrl = 'http://localhost:3000/api';
//const apiUrl = 'https://gleitsmann-expense-app.herokuapp.com/api';


export const signUp = data => {
    return async dispatch => {
        try{
            //console.log('data', data);
            const res = await axios.post(`${apiUrl}/signup`, data);
            //console.log('res local', res.data.method);
                dispatch({
                    type:'AUTH_SIGNUP',
                    payload:res.data.token,
                    email:res.data.email,
                    method:res.data.method,
                    expenses:res.data.data
                });
                localStorage.setItem('JWT_TOKEN', res.data.token);
                localStorage.setItem('EMAIL', res.data.email);
                localStorage.setItem('METHOD', res.data.method);
                //console.log(res);
        }catch(err){
            dispatch({
                type:'AUTH_ERROR',
                payload:'Email is already in use'
            });
        }
    }
}


export const signOut = () => {
  console.log('inside sign out');
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('EMAIL');
    localStorage.removeItem('METHOD');
    axios.defaults.headers.common['Authorization'] = '';

    dispatch({
      type: "AUTH_SIGNOUT",
      payload: '',
      email:'',
      method:'',
      expenses:[]
    });
  };
}


export const signIn = data => {
  return async dispatch => {
    try {
      const res = await axios.post(`${apiUrl}/sign-in`, data);
      dispatch({
        type: 'AUTH_SIGNIN',
        payload: res.data.token,
        email: res.data.email,
        method:res.data.method,
        expenses:res.data.data
      });
      localStorage.setItem('JWT_TOKEN', res.data.token);
      localStorage.setItem('EMAIL', res.data.email);
      localStorage.setItem('METHOD', res.data.method);
      axios.defaults.headers.common['Authorization'] = res.data.token;
      //dispatch to expenses action
      //const expenses = await.get(`${apiUrl}/`)

    } catch(err) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Email and password combination isn\'t valid'
      });
    }
  };
}

export const oauthGoogle = data => {
  //console.log('running oauth action', data);
    return async dispatch => {
        try{
            const res = await axios
              .post(`${apiUrl}/oauth-google`, {access_token: data});
              dispatch({
                type:'AUTH_SIGNUP',
                payload:res.data.token,
                email:res.data.email,
                method:res.data.method,
                expenses:res.data.data
            });
            //console.log('after post res', res);
            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('EMAIL', res.data.email);
            localStorage.setItem('METHOD', res.data.method);

        }catch(err){
            console.log('err', err);
        }
    };
}
