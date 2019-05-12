import uuid from 'uuid';
import timestamp from 'time-stamp';

//add expense
export const addExpense = ({ description='', note='', amount = 0, createdAt = timestamp.utc('YYYY/MM/DD:mm:ss')} = {}) =>({
    type:'ADD_EXPENSE',
    expense:{
        id:uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

export const removeExpense = ({ id } = {}) => ({
    type:'REMOVE_EXPENSE',
    id
});

export const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
});