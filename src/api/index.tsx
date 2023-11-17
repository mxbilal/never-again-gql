import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://api-eu-west-2.hygraph.com/v2/clolfekda891n01uqbbqrev99/master',
  cache: new InMemoryCache(),
});

export default client