import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import Homepage from '../components/Homepage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage'
import NotFound from '../components/NotFound';
import About from '../components/About';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';

const AppRouter = () => (
    <Router>
        <div>
            
            <Switch>
                <Route path="/" component={Homepage} exact={true}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/dashboard" component={ExpenseDashboardPage}/>
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/about" component={About} />
                <Route component={NotFound}/>  
            </Switch>
        </div>
    </Router>
);

export default AppRouter;