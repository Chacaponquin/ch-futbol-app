import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import AppRoutes from "./Layout/Routes/Routes";

import "./index.css";
import "antd/dist/antd.css";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext({
    headers: {
      authorization: token ? `bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
  connectToDevTools: true,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
