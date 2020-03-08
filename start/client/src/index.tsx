import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import injectStyles from "./styles";
import { resolvers, typeDefs } from "./resolvers";

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: "http://localhost:3000/"
});

const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: "http://localhost:4000/graphql",
        headers: {
            authorization: localStorage.getItem("token")
        }
    }),
    typeDefs,
    resolvers
});
cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem("token"),
        cartItems: []
    }
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: [],
    },
});

injectStyles();
ReactDOM.render(
    <ApolloProvider client={client}>
        <Pages />
    </ApolloProvider>,
    document.getElementById("root")
);