import React from 'react';
import {Provider, defaultTheme, Flex} from '@adobe/react-spectrum';
import styled from 'styled-components';
import { AuthClient } from '@dfinity/auth-client';
import NotAuthenticated from './components/NotAuthenticated';

const Header = styled.header`
  padding: 1rem;
  display: flex;
  justify-content: center;
  h2 {
    margin-top: 0;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

export const AppContext = React.createContext<{
  authClient?: AuthClient
}>({})

const App = () => {
  const [authClient, setAuthClient] = React.useState<AuthClient | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    AuthClient.create().then(async (client) => {
        setAuthClient(client);
        setIsAuthenticated(await client.isAuthenticated());
        setIsLoaded(true);
      });
  }, [])

  return (
    <Provider theme={defaultTheme}>
      <AppContext.Provider value={{ authClient }}>
        <Main>
          <Header>
            <h2>IC Avatar</h2>
          </Header>
          <Flex maxWidth={900} margin={'1rem auto'}>
            {!isAuthenticated && !isLoaded ? (
              <></>
            ) : isLoaded ? (
              <NotAuthenticated/>
            ) : (
              <></>
            )}
          </Flex>
        </Main>
      </AppContext.Provider>
    </Provider>
  )
}

export default App;
