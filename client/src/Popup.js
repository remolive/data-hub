import React from 'react';
import { Section, Modal } from 'react-bulma-components';

class Popup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }

    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ show: false });
    this.props.onClose();
  }

  render() {
    return (
      <Modal show={ this.state.show } onClose={ this.onClose } >
        <Modal.Content>
          <Section style={{ backgroundColor: 'white', color: this.props.color }}>
            { this.props.text }
          </Section>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Popup;