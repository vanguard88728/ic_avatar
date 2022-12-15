import React from 'react';
import {Provider, defaultTheme, Flex} from '@adobe/react-spectrum';
import styled from 'styled-components';
import { AuthClient } from '@dfinity/auth-client';
import { ActorSubclass } from "@dfinity/agent";
import NotAuthenticated from './components/NotAuthenticated';
import Home from './components/Home';
import Loader from './components/Loader';
import { canisterId, createActor } from '../../declarations/avatar_backend';
import { _SERVICE } from '../../declarations/avatar_backend/avatar_backend.did';

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
  authClient?: AuthClient;
  setIsAuthenticated?: React.Dispatch<boolean>;
  actor?: ActorSubclass<_SERVICE> | undefined
}>({})

const App = () => {
  const [authClient, setAuthClient] = React.useState<AuthClient | undefined>(undefined);
  const [actor, setActor] = React.useState<ActorSubclass<_SERVICE> | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState('');

  React.useEffect(() => {
    AuthClient.create().then(async (client) => {
        setAuthClient(client);
        setIsAuthenticated(await client.isAuthenticated());
        setIsLoaded(true);
      });
  }, []);

  React.useEffect(() => {
    if (!authClient) return;

    const identity = authClient.getIdentity();
    const actor = createActor(canisterId as string, {
      agentOptions: {
        identity
      }
    });
    setActor(actor);
  }, [authClient])

  return (
    <Provider theme={defaultTheme}>
      <AppContext.Provider value={{ authClient, setIsAuthenticated, actor }}>
        <Main>
          <Header>
            <h2>IC Avatar</h2>
          </Header>
          <Flex maxWidth={900} margin={'1rem auto'}>
            {!isAuthenticated && !loadingMessage ? (
              <NotAuthenticated/>
            ) : (
              <Home />
            )}
          </Flex>
          {loadingMessage ? <Loader message={loadingMessage} /> : null}
        </Main>
      </AppContext.Provider>
    </Provider>
  )
}

export default App;
