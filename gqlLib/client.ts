import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://blendarecipe2.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: "cache-and-network",
  //   },
  // },
});

export default client;
