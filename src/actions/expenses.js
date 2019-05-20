import uuid from 'uuid';
import timestamp from 'time-stamp';
import axios from 'axios';
//import store from '../store/configureStore';
//const apiUrl = 'http://localhost:3000/api';
const apiUrl = 'https://gleitsmann-expense-app.herokuapp.com/api';

//add expense
export const addExpense = (expense) =>{
    return {
        type:'ADD_EXPENSE',
        expense
    };
};

export const startAddExpense = (expenseData = {}, initMethod='', initEmail='') => {
    //console.log('initMethod', initMethod);
    //console.log('initEmail', initEmail);
    const {id = uuid(), description='', note='', amount = 0, createdAt = timestamp.utc('YYYY/MM/DD:mm:ss')} = expenseData;
    const expense = {id, description, note, amount, createdAt};

    if(initMethod && initEmail){
        return (dispatch) => {
            return axios
            .post(`${apiUrl}/${initMethod}/${initEmail}`, {...expense})
            .then(() => { dispatch(addExpense({...expense}));})
            .catch((res) => {return Promise.reject(res);});
        };
    }
    else{
        return(dispatch)=>(
            dispatch(addExpense({...expense}))
        );
    }
};





export const removeExpense = ({ id } = {}) => {
    return{
        type:'REMOVE_EXPENSE',
        id
    };
};
//'/edit/:method/:email/:id'
export const startRemoveExpense = ({id, method, email} = {}) => {
    if(id && method && email){
        //console.log("id", id);
        //console.log("method", method);
        //console.log("email", email);
        return(dispatch)=>{
            return axios
            .put(`${apiUrl}/remove/${method}/${email}/${id}`)
            .then((req) => {
                dispatch(removeExpense({id}));
            })
            .catch((res) => {return Promise.reject(res);});
        }
    }
    else{
        dispatch(removeExpense({id}));
    }
};


export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, method, email, updates) => {
    if(method && email){
        return (dispatch) => {
            return axios
            .put(`${apiUrl}/edit/${id}/${method}/${email}`, updates)
            .then((req) => {
                dispatch(editExpense(id, updates));
            })
            .catch((res) => {return Promise.reject(res);});
        }
    }
    else{
        return(dispatch) => {
            dispatch(editExpense(id, updates));
        }
    }
};


export const setExpenses = (expenses) => {
    return{
        type:'SET_EXPENSES',
        expenses
    };
};

export const startSetExpenses = (initMethod, initEmail) => {
    //console.log('inside start expenses');
    //console.log(initMethod, initEmail);
    if(initMethod && initEmail){
        return (dispatch) => {
            //console.log('initial method in startsetexpenses', initMethod);
            //console.log('initial email in startsetexpenses', initEmail);
            return axios
            .get(`${apiUrl}/${initMethod}/${initEmail}`)
            .then((req) => {
                const expenseList = [];
                req.data.data.forEach((expense) => {
                    expenseList.push(expense);
                })
                dispatch(setExpenses(expenseList));
            })
            .catch((res) => {return Promise.reject(res);});
        }
    }
    else{
        return (dispatch) =>{
            dispatch(setExpenses([]));
        }
    }
};

export const clearExpenses = () => {
    console.log('clearing expenses');
    return{
        type:'CLEAR_EXPENSES'
    };
}
