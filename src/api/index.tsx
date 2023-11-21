import { ApolloClient, InMemoryCache } from '@apollo/client';
const defaultOptions: any = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}
const client = new ApolloClient({
  uri: 'https://api-eu-west-2.hygraph.com/v2/clolfekda891n01uqbbqrev99/master',
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default client