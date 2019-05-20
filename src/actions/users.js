import axios from 'axios';
//import store from '../store/configureStore';
//const apiUrl = 'http://localhost:3000/api';
const apiUrl = 'https://gleitsmann-expense-app.herokuapp.com/api';


export const signUp = data => {
    return async dispatch => {
        try{
            //console.log('data', data);
            const res = await axios.post(`${apiUrl}/signup`, data);
            console.log('res local', res.data.method);
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
                console.log(res);
        }catch(err){
            dispatch({
                type:'AUTH_ERROR',
                payload:'Email is already in use'
            });
        }
    }
}


export const signOut = () => {
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
  console.log('running oauth action');
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
            console.log('after post res', res);
            localStorage.setItem('JWT_TOKEN', res.data.token);
            localStorage.setItem('EMAIL', res.data.email);
            localStorage.setItem('METHOD', res.data.method);

        }catch(err){
            console.log('err', err);
        }
    };
}

// export const setExpenses = (expenses) => {
//     return{
//         type:'SET_EXPENSES',
//         expenses
//     };
// };

// export const setUserExpenses = (initMethod, initEmail) => {
//   if(initMethod && initEmail){
//     return async dispatch => {
//       try{
//         const res = await axios
//         .get(`${apiUrl}/${initMethod}/${initEmail}`)
//         .then((req) => {
//           const expenseList = [];
//           req.data.data.forEach((expense) => {
//                 expenseList.push(expense);
//             })
//           dispatch(setExpenses(expenseList));
//         })
//       }
//       catch(err){
//         console.log('err in set', err);
//       }
//     }
//   }
//   return console.log('no initial method & email');
// }






// export const editExpense = (id, updates) => ({
//     type:'EDIT_EXPENSE',
//     id,
//     updates
// });

// export const startEditExpense = (id, updates) => {
//     return (dispatch) => {
//         return axios
//         .put(`${apiUrl}/edit/${id}`, updates)
//         .then((req) => {
//             dispatch(editExpense(id, updates));
//         })
//         .catch((res) => {return Promise.reject(res);});
//     }
// };





// export const removeExpense = ({ id } = {}) => {
//     return{
//         type:'REMOVE_EXPENSE',
//         id
//     };
// };

// export const startRemoveExpense = ({id} = {}) => {
//     return(dispatch)=>{
//         return axios
//         .delete(`${apiUrl}/edit/${id}`)
//         .then((req) => {
//             dispatch(removeExpense({id}));
//         })
//         .catch((res) => {return Promise.reject(res);});
//     }
// };




// export const addExpense = (expense) =>{
//     return {
//         type:'ADD_EXPENSE',
//         expense
//     };
// };

// export const startAddExpense = (expenseData = {}, initMethod, initEmail) => {
//     return (dispatch) => {
//         const {id = uuid(), description='', note='', amount = 0, createdAt = timestamp.utc('YYYY/MM/DD:mm:ss')} = expenseData;
//         const expense = {id, description, note, amount, createdAt};
        
//         return axios
//         .post(`${apiUrl}`, {...expense})
//         .then(() => { dispatch(addExpense({...expense}));})
//         .catch((res) => {return Promise.reject(res);});
//     };
// };

