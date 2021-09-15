import React from 'react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import styled from "styled-components";

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

const App = () => {

  return (
    <Provider theme={defaultTheme}>
      <Main>
        <Header>
          <h2>IC Avatar</h2>
        </Header>
      </Main>
    </Provider>
  )
}

export default App;
