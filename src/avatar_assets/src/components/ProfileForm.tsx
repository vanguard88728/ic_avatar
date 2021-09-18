import React from 'react'
import { ProfileUpdate } from '../../../declarations/avatar/avatar.did';
import { Button, Form, TextArea, TextField } from '@adobe/react-spectrum';

interface Props {
  submitCallback: (profile: ProfileUpdate) => void
}

class ProfileForm extends React.Component<Props>{
  state = {
    about: '',
    displayName: '',
    familyName: '',
    givenName: '',
    location: ''
  }

  constructor(props: Props) {
    super(props);
  }

  handleSubmit = () => {
    const { about, displayName, familyName, givenName, location } = this.state;
    const name = [givenName, familyName].join(' ');

    const profile: ProfileUpdate = {
      bio: {
        name: name ? [name] : [],
        givenName: givenName ? [givenName] : [],
        familyName: familyName ? [familyName] : [],
        displayName: displayName ? [displayName] : [],
        about: about ? [about] : [],
        location: location ? [location] : [],
      }
    }

    this.props.submitCallback(profile);
  }

  handleChange = (key: string, value: string) => {
    const newState: { [key: string]: string } = {};
    newState[key] = value;
    this.setState(newState);
  }

  render() {
    const { about, displayName, familyName, givenName, location } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <TextField
          label={'First Name'}
          name={'givenName'}
          value={givenName}
          onChange={(value) => this.handleChange('givenName', value)}
        />
        <TextField
          label={'Last Name'}
          name={'familyName'}
          value={familyName}
          onChange={(value) => this.handleChange('familyName', value)}
        />
        <TextField
          label={'Display Name'}
          name={'displayName'}
          value={displayName}
          onChange={(value) => this.handleChange('displayName', value)}
        />
        <TextField
          label={'Location'}
          name={'location'}
          value={location}
          onChange={(value) => this.handleChange('location', value)}
        />
        <TextArea
          label={'About'}
          name={'about'}
          value={about}
          onChange={(value) => this.handleChange('about', value)}
        />
        <Button variant={'primary'} type={'submit'} onPress={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default ProfileForm;
