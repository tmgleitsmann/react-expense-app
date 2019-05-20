import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {startSetExpenses} from './actions/expenses';
//import {setUserExpenses} from './actions/users';
import {setTextFilter, sortByAmount} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import * as serviceWorker from './serviceWorker';


const jwtToken = localStorage.getItem('JWT_TOKEN');
const curremail = localStorage.getItem('EMAIL');
const method = localStorage.getItem('METHOD');

const store = configureStore(jwtToken, curremail, method);


const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render(<p>loading...</p>, document.getElementById('root'));
if(curremail && method){
    store.dispatch(startSetExpenses(method, curremail)).then(() => {
        ReactDOM.render(jsx, document.getElementById('root'));
    });
}
else{
    ReactDOM.render(jsx, document.getElementById('root'));
}

serviceWorker.unregister();
