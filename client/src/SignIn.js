import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button, Section } from 'react-bulma-components';

class SignIn extends React.Component {
  render() {
    return (
      <Section>
        <Button onClick={ this.props.handler } color="primary" >SignIn Here!</Button>
      </Section>
    )
  }
}

export default SignIn;