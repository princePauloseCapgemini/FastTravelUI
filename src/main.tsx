import React from "react";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import theme from "./theme";
import apolloAuthClient from "./utilities/apolloAuthClient";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={apolloAuthClient()}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>
);
