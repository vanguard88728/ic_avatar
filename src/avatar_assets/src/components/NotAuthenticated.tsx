import { Button } from '@adobe/react-spectrum';
import React from 'react'
import styled from 'styled-components';
import { AppContext } from "../App";

interface Props {}

const Header = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function NotAuthenticated(props: Props) {
  const {} = props;
  const {authClient} = React.useContext(AppContext)

  return (
    <section>
      <h1>You are not authenticated</h1>
      <Button variant='cta' onPress={async () => {
        await authClient?.login()
      }}>Login with II</Button>
    </section>
  );
}

export default NotAuthenticated;
