import React from "react";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import Cookies from "js-cookie";

import App from "./App";
import "./index.css";
import theme from "./theme";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const userInfo = Cookies.get("jwt") || "{}";
  const JWT = JSON.parse(userInfo)?.jwt || undefined;

  return {
    headers: {
      ...headers,
      authorization: JWT ? `Bearer ${JWT}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
