import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = "https://srcblending-production.up.railway.app/graphql";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;
