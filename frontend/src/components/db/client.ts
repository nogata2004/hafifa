import { ApolloClient, DefaultOptions, HttpLink, InMemoryCache } from "@apollo/client";

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache', // apollo fetchpolicy
        errorPolicy: 'ignore' // apollo errorpolicy
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
    },
}

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: '/graphql' }),
    defaultOptions: defaultOptions
});