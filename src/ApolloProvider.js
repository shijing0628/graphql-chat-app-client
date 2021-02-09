import { ApolloClient, InMemoryCache, ApolloProvider as Provider ,createHttpLink} from '@apollo/client';
import React from 'react'

import { setContext } from '@apollo/client/link/context';
//https://www.apollographql.com/docs/react/networking/authentication/
const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default function ApolloProvider(props){
 return (<Provider client={client} {...props}/>)
}