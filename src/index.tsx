import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const link = createHttpLink({
  uri: 'https://80c588ca-d345-476a-9b32-91010b89634f.mock.pstmn.io/graphql'
 })

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
