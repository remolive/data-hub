import React from 'react';
import './App.css';
import Menu from './Menu';
import Records from './Records'
import SignIn from './SignIn'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

    this.sign = this.sign.bind(this)
    this.toggleSign = this.toggleSign.bind(this)
  }

  sign() {
    this.setState({
      isLoggedIn: true
    })
  }

  toggleSign() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    let view = <SignIn handler={ this.sign } />

    if (isLoggedIn) {
      view = <Records />
    }

    return (
      <div>
        <Menu isLoggedIn={ isLoggedIn } handler={ this.toggleSign }/>
        { view }
      </div>
    )
  }
}

export default App;