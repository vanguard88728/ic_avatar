import React, {useEffect} from 'react'
import styled from 'styled-components';
import { AppContext } from "../App";
import {Profile} from "../../../declarations/avatar/avatar.did";
import Loader from "./Loader";

interface Props {}

const Header = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function Home(props: Props) {
  const {} = props;
  const [profile, setProfile] = React.useState<Profile>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const {actor} = React.useContext(AppContext);

  useEffect(() => {
    actor?.read().then(result => {
      if ("ok" in result) {
        setProfile(result.ok);
      }
      setIsLoaded(true);
    })
  }, [actor])

  if (!isLoaded) {
    return (
      <section>
        <Loader />
      </section>
    )
  }

  return (
    <section>
      Home
      <div>{JSON.stringify(profile)}</div>
    </section>
  );
}

export default Home;
