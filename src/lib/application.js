import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { useCookies } from 'react-cookie';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`GraphQL error: ${message}`);
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError.message}`);
  }
});

const createApolloClient = (csrfToken) => {
  return new ApolloClient({
    link: from([
      errorLink,
      new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_API_URL}/query`,
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
        mode: 'cors',
        credentials: 'include',
      }),
    ]),
    cache: new InMemoryCache(),
  });
};

const ApolloClientProvider = ({ children }) => {
  const [cookies] = useCookies(['_csrf']);
  const client = createApolloClient(cookies._csrf);
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default ApolloClientProvider;
