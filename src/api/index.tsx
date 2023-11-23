import { ApolloClient, InMemoryCache, ApolloLink, HttpLink  } from '@apollo/client';
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

const httpLink = new HttpLink({ uri: 'https://api-eu-west-2.hygraph.com/v2/clolfekda891n01uqbbqrev99/master' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('auth_token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MDA2NjMyMjIsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xvbGZla2RhODkxbjAxdXFiYnFyZXY5OS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMmUxZTU2MTMtZDZjZS00MjYxLWFiZTEtODE1Y2NjMmFhMGEwIiwianRpIjoiY2xwOXV6MG51MDNwejAxdWkxem4yMjByeCJ9.vfk0Uue8zVll5a6E1ERnoTang9mXNAd2Wo9CeyPgPcUC2lWg4jmd5FBMq0j__cpdibAVgWwLSwJ95796wYd9wXEptXqADLNu00ZKZdY3at_xrVm-wmO6TaL1fKHQC--QoET9Y7qe4taPjsfL1_e45xaZBpNg7pamwXRdwGDoW6bZpTsDo-UQSIruCETYndpzzUQSq-XpClaCOTefp1o45P7S8EBpYEtB0oDoZEx723OGdyj17f5gI1lS0mPQ_lus5nbdVKM5T3DmddHfvufYlvUH5c8jFfgMvbJTwGHZFjBIC6CcGxsQxYnHsMFc4Yhsjd8ZQUH3o-d8JE6bU2dYD-wchjGCpQeSi_6UXRyJh6xj-BPMIm7hdmJ3Zq5TA6UHQ_u7Q8RhfOCoh3hEsLc_prMmBkHhJ4Iv5ZoyF93V7LbRGBEOPUkKoTkdke5GTRlb4delFsORhDXYjpoxHhHKxS8io6KW9STUaLbFU93v5x_9QQhNqn4MRdSaaxBaTJV2k6j7Hl5vB6PyGDwXsL7WdCa0esg14XpNKYkPKQkqW8GyS-9pwey-1ysfyJ0QxWEIlRtLYeI6yWQ-P5xdVOUSwP0totnleJWmPL0wTQw1KuEd5jpUXY0uWf8aHfLNCgzard--Vz82eCLQA8sWXI8KrQ8a9tl3IsH-WB71z8YpciQ`
    }
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});


const client = new ApolloClient({
  // uri: 'https://api-eu-west-2.hygraph.com/v2/clolfekda891n01uqbbqrev99/master',
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default client