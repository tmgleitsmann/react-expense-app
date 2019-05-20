import {createStore, combineReducers, applyMiddleware} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import usersReducer from '../reducers/users';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default (jwtToken, curremail, currmethod) => {
    const store = createStore(
        combineReducers({
            expenses:expensesReducer,
            filters:filtersReducer,
            users:usersReducer
        }), {users: {token:jwtToken, isAuthenticated:jwtToken ? true : false, email:curremail, method:currmethod} },
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}
