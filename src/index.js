import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import client from './graphql/client'
import { ApolloProvider } from '@apollo/client/react';

import store from './store';

const app = (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
