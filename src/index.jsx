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
  BlogHome,
  SignUp,
  CreateTeam,
  CreatePlayer,
  AllPlayers,
  BlogViewArticle,
} from "./containers";
import "./index.css";
import "antd/dist/antd.css";
import UserProvider from "./context/UserContext";

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
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<SignUp />} />

            <Route path="/" element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/createTeam" element={<CreateTeam />} />
              <Route path="/createPlayer" element={<CreatePlayer />} />
              <Route path="/allPlayers" element={<AllPlayers />} />

              <Route path="/blog" element={<BlogHome />} />
              <Route
                path="/blog/viewArticle/:id"
                element={<BlogViewArticle />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
