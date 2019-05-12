import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import Homepage from '../components/Homepage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage'
import NotFound from '../components/NotFound';
import About from '../components/About';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';

const AppRouter = () => (
    <Router>
        <div>
            <SiteHeader/>
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true}/>
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/about" component={About} />
                <Route component={NotFound}/>  
            </Switch>
        </div>
    </Router>
);

export default AppRouter;