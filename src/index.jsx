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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import {
  Home,
  Blog,
  Login,
  CreateTeam,
  CreatePlayer,
  AllPlayers,
} from "./containers";
import "./index.css";
import "antd/dist/antd.css";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  // add the authorization to the headers
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
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/createTeam" element={<CreateTeam />} />
            <Route path="/createPlayer" element={<CreatePlayer />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allPlayers" element={<AllPlayers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
