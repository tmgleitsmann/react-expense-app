import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter, sortByAmount} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

//add expense, water bill
store.dispatch(addExpense({description:'Water Bill', amount:10800, createdAt:100}));
//add expense, gas bill
store.dispatch(addExpense({description:'Gas Bill', amount:4500, createdAt:250}));
store.dispatch(addExpense({description:'Electric Bill', amount:9500, createdAt:1000}));
//set text filter, bill
//store.dispatch(setTextFilter(''));
//store.dispatch(sortByAmount());


const state = store.getState();
getVisibleExpenses(state.expenses, state.filters);


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);



ReactDOM.render(jsx, document.getElementById('root'));

serviceWorker.unregister();
