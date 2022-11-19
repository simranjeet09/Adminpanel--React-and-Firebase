import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import HomePage from './../pages/index';
import NotFoundPage from './../pages/NotFoundPage/index.js';
import LoginPage from '../pages/LoginPage/Login';
import SignUpPage from '../pages/SignUpPage/index.js';
import AuthProvider from './../providers/AuthProvider';
import TodoForm from '../pages/todo/TodoForm';
import TodoApp from '../pages/todo';
// Every Route and component does require either Private or Public Route creation.

const Navigation = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Switch>
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/sign-up" component={SignUpPage} />

                    <Route
                        exact
                        path="/overview/dashboard"
                        component={HomePage}
                    />
                    <Route exact path="/overview/users" component={HomePage} />
                    <Route exact path="/overview/todo" component={HomePage} />

                    <Route
                        exact
                        path="/overview/weather"
                        component={HomePage}
                    />
                    <Route exact path="/overview/news" component={HomePage} />
                    <Route exact path="/overview/stock" component={HomePage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default Navigation;
