import React from 'react'
import { Profile, ProfileUpdate } from "../../../declarations/avatar/avatar.did";
import styled from 'styled-components';
import { ActionButton, ButtonGroup, Grid, Heading, Text } from '@adobe/react-spectrum';
import ProfileForm from './ProfileForm';
import { AppContext } from '../App';

const DetailsList = styled.dl`
  dd {
    margin-left: 0;
  }
`;

interface Props {
  profile: ProfileUpdate;
  setProfile: React.Dispatch<Profile>;
}

function ManageProfile(props: Props) {
  const { profile, setProfile} = props;
  const { actor } = React.useContext(AppContext);
  const [isEditing, setIsEditing] = React.useState(false);

  const submitCallback = async (profile: ProfileUpdate) => {
    const response = await actor?.update(profile);
    if (actor && response && "ok" in response) {
      const profileResponse = await actor.read();
      if ("ok" in profileResponse) {
        setProfile(profileResponse.ok);
        setIsEditing(false);
      }
    }
  }

  const deleteProfile = async () => {
    if (confirm('Are you sure you want to delete your profile?')) {
      await actor?.delete();
      location.reload();
    }
  }

  if (isEditing) {
    return (
      <section>
        <Heading level={1}>Edit your profile</Heading>
        <ProfileForm submitCallback={submitCallback} />
        <ButtonGroup>
          <ActionButton onPress={()=>setIsEditing(false)}>
            <Text>Cancel</Text>
          </ActionButton>
        </ButtonGroup>
      </section>
    );
  }

  return (
    <section>
      <Heading level={2}>Welcome back, {profile.bio.displayName ?? profile.bio.givenName}</Heading>
      <DetailsList>
        <Grid columns={'1fr 1fr'} gap={'1rem'}>
          <dd>Name:</dd>
          <dt>{profile.bio.name}</dt>
          <dd>Display Name:</dd>
          <dt>{profile.bio.displayName}</dt>
          <dd>First Name:</dd>
          <dt>{profile.bio.givenName}</dt>
          <dd>Last Name:</dd>
          <dt>{profile.bio.familyName}</dt>
          <dd>Location:</dd>
          <dt>{profile.bio.location}</dt>
          <dd>About:</dd>
          <dt>{profile.bio.about}</dt>
        </Grid>
      </DetailsList>
      <ButtonGroup>
        <ActionButton onPress={()=>setIsEditing(true)}>
          <Text>Edit</Text>
        </ActionButton>
        <ActionButton onPress={deleteProfile}>
          <Text>Delete</Text>
        </ActionButton>
      </ButtonGroup>
    </section>
  );
}

export default ManageProfile;
