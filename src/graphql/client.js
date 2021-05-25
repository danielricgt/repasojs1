import { ApolloClient, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  uri: 'https://backen-udistrital.herokuapp.com/v1/graphql',
  cache: new InMemoryCache()
});