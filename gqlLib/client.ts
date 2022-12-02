import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = "https://blenda.onrender.com/graphql";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: "cache-and-network",
  //   },
  // },
});

export default client;
