import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Navbar, Button } from 'react-bulma-components';

class Menu extends React.Component {
  render() {
    const isLoggedIn = this.props.isLoggedIn
    let button = isLoggedIn

    if (isLoggedIn) {
      button = <Button onClick={ this.props.handler } color="danger">Logout</Button>
    } else {
      button = <Button onClick={ this.props.handler } color="primary">SignIn!</Button>
    }

    return (
      <Navbar color="white" fixed="top">
        <Navbar.Brand>
          <Navbar.Item>
            <img src="https://i.pinimg.com/originals/53/79/69/53796917bbf68c2c90c22d820773e84b.png" alt="logo"/>
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
        <Navbar.Menu >
          <Navbar.Container>
            <Navbar.Item href="#">
              Home
            </Navbar.Item>
          </Navbar.Container>
          <Navbar.Container position="end">
            <Navbar.Item href="/#">
              { button }
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
    )
  }
}

export default Menu;