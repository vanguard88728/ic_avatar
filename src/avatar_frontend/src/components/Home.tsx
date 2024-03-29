import React, {useEffect} from 'react'
import styled from 'styled-components';
import { AppContext } from '../App';
import { Profile } from '../../../declarations/avatar_backend/avatar_backend.did';
import Loader from './Loader';
import { Flex } from '@adobe/react-spectrum';
import CreateProfile from './CreateProfile';
import ManageProfile from './ManageProfile';

interface Props {}

function Home(props: Props) {
  const {} = props;
  const [profile, setProfile] = React.useState<Profile>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { actor } = React.useContext(AppContext);

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
      <Flex>
        <Loader />
      </Flex>
    )
  }

  return (
    <section>
      {profile ? (
        <ManageProfile setProfile={setProfile} profile={profile} />
      ) : (
        <CreateProfile setProfile={setProfile} />
      )}
    </section>
  );
}

export default Home;
