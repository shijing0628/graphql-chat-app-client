import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
  createHttpLink,
  split,
} from "@apollo/client";
import React from "react";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

//https://www.apollographql.com/docs/react/networking/authentication/
let httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

//setup subscription getting message on client side: https://www.apollographql.com/docs/react/data/subscriptions/
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true,
//     connectionParams: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   },
// });

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//    wsLink,
//   httpLink
// );

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default function ApolloProvider(props) {
  return <Provider client={client} {...props} />;
}
