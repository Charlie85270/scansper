import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://optimum-turtle-56.hasura.app/v1/graphql",
  headers: {
    "content-type": "application/json",
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_KEY,
  },
  cache: new InMemoryCache(),
});

export default client;
