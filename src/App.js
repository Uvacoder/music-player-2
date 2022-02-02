import './App.css';
// import Home from './app/Home/Home';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import NewHome from './app/Home/NewHome';
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.ss.dev/resource/api" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <NewHome />
      </ApolloProvider>
    </div>
  );
}

export default App;
