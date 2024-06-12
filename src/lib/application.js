import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { useCookies } from 'react-cookie';

const createApolloClient = (csrfToken) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL}/query`,
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
      mode: 'cors',
      credentials: 'include',
    }),
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