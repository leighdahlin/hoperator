import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//for new version of react-router-dom, Routes replaced Switch and Navigate replaced Redirect

import Auth from './utils/auth';

import Navbar from './components/General/Navbar';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
      <Router>
        <Navbar />
      <Routes>
          <Route path="/" element={<Home />}/ >
      </Routes>
      </Router>
      </ApolloProvider>    
  );
}

export default App;
