import React from 'react';
import { Table, Modal, Section } from 'react-bulma-components';

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      record: {
        "id": 0,
        "title": "loading...",
        "description": "loading...",
        "content": []
      }
    }
  }

  getRecord() {
    if (this.props.recordID && this.state.record.id !== this.props.recordID) { // get raw data only if new record is selected
      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }

      fetch("http://localhost:5000/api/record/" + this.props.recordID, requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
              record: result
            });
          },
          (error) => {
            console.log("error")
            console.log(error)
          }
        )
    }
  }

  render() {
    this.getRecord()

    const columns = []
    const rows = []
    let content = this.state.record.content
    if (content[0] !== undefined) {
      JSON.parse(content[0]).forEach((column) => {
        columns.push(
          <th key={ column }><abbr title={ column }>{ column }</abbr></th>
        )
      })
      for (let i = 1; i < content.length; i++) {
        const row = []
        JSON.parse(content[i]).forEach((column, index) => {
          if (index < 4) { // make first columns bold (e.g. Country, State, ...)
            row.push(
              <th key={ i + index }>{ column }</th>
            )
          } else {
            row.push(
              <td key={ i + index }>{ column }</td>
            )
          }
        })
        rows.push(
          <tr key={ i } >{ row }</tr>
        )
      }
    }

    return (
      <Modal show={ this.props.recordID != null } onClose={ this.props.onClose } >
        <Modal.Card style={{ width: '95%' }} >
          <Modal.Card.Head>
            <Modal.Card.Title>
              { this.state.record.title }
            </Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body >
            <Section style={{ backgroundColor: 'white' }} >
              <Table>
                <thead>
                  <tr>
                    { columns }
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    { columns }
                  </tr>
                </tfoot>
                <tbody>
                    { rows }
                </tbody>
              </Table>
            </Section>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    )
  }
}

export default Record;