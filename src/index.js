import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Navigation from './routes';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { createStore, applyMiddleware } from 'redux';

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
    <Provider store={store}>
        <Navigation />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
