import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

export default function apolloAuthClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const userInfo = Cookies.get("jwt") || "{}";
    const JWT = JSON.parse(userInfo)?.jwt || undefined;

    return {
      headers: {
        ...headers,
        authorization: JWT ? `Bearer ${JWT}` : "",
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
}
