import uuid from 'uuid';
import timestamp from 'time-stamp';
import axios from 'axios';
const apiUrl = 'https://gleitsmann-expense-app.herokuapp.com/api';
//const apiUrl = 'http://localhost:3000/api';

//add expense
export const addExpense = (expense) =>{
    return {
        type:'ADD_EXPENSE',
        expense
    };
};

export const startAddExpense = (expenseData = {}, initMethod='', initEmail='') => {
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

export const startRemoveExpense = ({id, method, email} = {}) => {
    if(id && method && email){
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
        return(dispatch)=>{
            dispatch(removeExpense({id}));
        }
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
    if(initMethod && initEmail){
        return (dispatch) => {
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
    return{
        type:'CLEAR_EXPENSES'
    };
}
