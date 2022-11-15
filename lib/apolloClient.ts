import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "./auth/initializeApp";
import { setContext } from '@apollo/client/link/context';

const auth = getAuth(firebaseApp);

const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const tokenId = await auth.currentUser?.getIdToken()
  return {
    headers: {
      ...headers,
      authorization: tokenId,
    }
  }
});

const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default apolloClient;