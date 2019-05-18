import uuid from 'uuid';
import timestamp from 'time-stamp';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api';
//const apiUrl = 'https://gleitsmann-expense-app.herokuapp.com/api';

//add expense
export const addExpense = (expense) =>{
    return {
        type:'ADD_EXPENSE',
        expense
    };
};

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {id = uuid(), description='', note='', amount = 0, createdAt = timestamp.utc('YYYY/MM/DD:mm:ss')} = expenseData;
        const expense = {id, description, note, amount, createdAt};
        
        return axios
        .post(`${apiUrl}`, {...expense})
        .then(() => { dispatch(addExpense({...expense}));})
        .catch((res) => {return Promise.reject(res);});
    };
};

export const removeExpense = ({ id } = {}) => {
    return{
        type:'REMOVE_EXPENSE',
        id
    };
};

export const startRemoveExpense = ({id} = {}) => {
    return(dispatch)=>{
        return axios
        .delete(`${apiUrl}/edit/${id}`)
        .then((req) => {
            dispatch(removeExpense({id}));
        })
        .catch((res) => {return Promise.reject(res);});
    }
};


export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return axios
        .put(`${apiUrl}/edit/${id}`, updates)
        .then((req) => {
            dispatch(editExpense(id, updates));
        })
        .catch((res) => {return Promise.reject(res);});
    }
};


export const setExpenses = (expenses) => {
    return{
        type:'SET_EXPENSES',
        expenses
    };
};

export const startSetExpenses = () => {
    return (dispatch) => {
        return axios
        .get(`${apiUrl}`)
        .then((req) => {
            const expenseList = [];
            req.data.data.forEach((expense) => {
                expenseList.push(expense);
            })
            dispatch(setExpenses(expenseList));
        })
        .catch((res) => {return Promise.reject(res);});
    }
};