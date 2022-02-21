import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://recipeblend.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   watchQuery: {
  //     fetchPolicy: "cache-and-network",
  //   },
  // },
});

export default client;
