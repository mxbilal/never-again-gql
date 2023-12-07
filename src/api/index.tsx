import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

const hygraph = import.meta.env.VITE_HYGRAPH_TOKEN || '';
const isLocal = window.location.hostname === 'localhost' || false;
let client;

// Default options for Apollo Client
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
};

// Create an Apollo Link for logging queries
const loggingLink = new ApolloLink((operation, forward) => {
  if (isLocal) {
    operation.operationName && console.log('[NeverAgain Development] Operation Name:', operation.operationName);
    operation.query && console.log('[NeverAgain Development] Query:', operation.query.loc?.source.body);
    operation.variables && console.log('[NeverAgain Development] Variables:', JSON.stringify(operation.variables));
    return forward(operation);
  }
});

// Create an Apollo Link for authentication
const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {authorization: hygraph},
  });
  return forward(operation);
});

// Create an HTTP Link for the API endpoint
const httpLink = new HttpLink({ uri: 'https://api-eu-west-2.hygraph.com/v2/clolfekda891n01uqbbqrev99/master' });

// Create the Apollo Client
if (isLocal) {
  client = new ApolloClient({
    link: loggingLink.concat(authLink).concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  });
} else {
  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  });
}

export default client;