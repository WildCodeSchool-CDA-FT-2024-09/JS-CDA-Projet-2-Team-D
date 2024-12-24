import { ApolloClient, InMemoryCache } from "@apollo/client";

const connexion = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
  credentials: "include", // This is crucial for cookie-based auth
});

export default connexion;
