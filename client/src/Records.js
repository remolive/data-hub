import React from 'react';
import RecordPreview from './RecordPreview';
import Record from './Record';
import SearchBar from './SearchBar';
import NewRecordForm from './NewRecordForm.js'
import { Button, Section } from 'react-bulma-components';

const LOADING_RECORDS = [
  {
    "id": 1,
    "title": "Loading Record 1...",
    "description": "blablabla... description.... blablabla...",
    "content": ["Country", "Region", "Date1", "Date2", "..."],
    "validated": true
  },
  {
    "id": 2,
    "title": "Loading Record 2...",
    "description": "blablabla... description.... blablabla...",
    "content": ["Country", "Region", "Date1", "Date2", "..."],
    "validated": true
  },
  {
    "id": 3,
    "title": "Loading Record 3...",
    "description": "blablabla... description.... blablabla...",
    "content": ["Country", "Region", "Date1", "Date2", "..."],
    "validated": true
  }
]

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      records: LOADING_RECORDS,
      selectedRecordID: null,
      createRecord: false
    }

    this.selectRecord = this.selectRecord.bind(this);
    this.closeRecord = this.closeRecord.bind(this);
    this.openNewRecordForm = this.openNewRecordForm.bind(this);
    this.closeNewRecordForm = this.closeNewRecordForm.bind(this);
    this.getRecords = this.getRecords.bind(this);
  }

  getRecords(params) {
    const requestOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    fetch("http://localhost:5000/api/records?q=" + params, requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({
            records: result
          });
        },
        (error) => {
          console.log("error")
          console.log(error)
        }
      )
  }

  componentDidMount() {
    this.getRecords("");
  }

  selectRecord(id) {
    this.setState({
      selectedRecordID: id
    })
  }

  closeRecord() {
    this.setState({
      selectedRecordID: null
    })
  }

  openNewRecordForm() {
    this.setState({
      createRecord: true
    })
  }

  closeNewRecordForm() {
    this.setState({
      createRecord: false
    })
  }

  render() {
    const previews = []
    this.state.records.forEach((record) => {
      previews.push(
        <RecordPreview record={ record } key={ record.id } onClick={ () => this.selectRecord(record.id) } />
      )
    })

    return (
      <div>
        <Section>
          <SearchBar onChange={ this.getRecords } />
          { previews }
          <Record onClose={ this.closeRecord } recordID={ this.state.selectedRecordID } />
        </Section>
        <Section>
          <Button color="info" onClick={ this.openNewRecordForm } >Create Record!</Button>
          <NewRecordForm onClose={ this.closeNewRecordForm } show={ this.state.createRecord } />
        </Section>
      </div>
    )
  }
}

export default Records;