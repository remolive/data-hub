import React from 'react';
import Popup from './Popup'
import { Section, Modal, Icon, Button } from 'react-bulma-components';
import { Field, Label, Control, Input, Textarea, InputFile } from 'react-bulma-components/lib/components/form';

class NewRecordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      file: undefined,
      postStatus: undefined
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.closeCompletePopup = this.closeCompletePopup.bind(this)
  }

  postRecord() {
    const formData  = new FormData();
    for(const name in this.state) {
      formData.append(name, this.state[name]);
    }

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }

    fetch("http://localhost:5000/api/records", requestOptions)
      .then(
        (result) => {
          console.log(result)
          const ok = result["ok"]
          this.setState({
            record: result.text(),
            postStatus: ok,
            statusMessage: result["statusText"]
          });
          this.props.onClose();
        },
        (error) => {
          console.log(error)
          this.setState({
            postStatus: false
          });
          this.props.onClose();
        }
      )
  }

  handleChange(event) {
    // const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    // console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log('Un essai a été envoyé : ');
    console.log(this.state);
    event.preventDefault();
    this.postRecord();
  }

  handleFileChange(event) {
    this.setState({
      file: event.target.files[0]
    })
  }

  closeCompletePopup() {
    this.setState({
      postStatus: undefined
    });
  }

  render() {
    if (this.state.postStatus !== undefined) {
      let text = "Failed"
      let color = "red"
      if (this.state.postStatus === true) {
        text = "Success"
        color = "green"
      }
      return (
        <Popup text={ text + " - " + this.state.statusMessage } color={ color } onClose={ this.closeCompletePopup }></Popup>
      )
    } else {
      return (
        <Modal show={ this.props.show } onClose={ this.props.onClose } >
          <Modal.Card style={{ width: '95%' }} >
            <Modal.Card.Head>
              <Modal.Card.Title>
                Create a new Record!
              </Modal.Card.Title>
            </Modal.Card.Head>
            <Modal.Card.Body >
              <Section style={{ backgroundColor: 'white' }} >
                <Field>
                  <Label>Title</Label>
                  <Control>
                    <Input
                      placeholder="Record title"
                      name="title"
                      type="text"
                      value={ this.state.title }
                      onChange={ this.handleChange } />
                  </Control>
                </Field>
                <Field>
                  <Label>Description</Label>
                  <Control>
                    <Textarea
                      placeholder="This data exposes evolution of X cases over years..."
                      name="description"
                      type="text"
                      value={ this.state.description }
                      onChange={ this.handleChange } />
                  </Control>
                </Field>
                <Field>
                  <Label>File (CSV)</Label>
                  <Control>
                    <InputFile icon={<Icon icon="upload" />} boxed placeholder="CSV" onChange={ this.handleFileChange } />
                  </Control>
                </Field>

                <Field kind="group">
                  <Control>
                    <Button type="primary" onClick={ this.props.onClose }>Cancel</Button>
                  </Control>
                  <Control>
                    <Button color="link" onClick={ this.handleSubmit }>Submit</Button>
                  </Control>
                </Field>
              </Section>
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
      )
    }
  }
}

export default NewRecordForm;