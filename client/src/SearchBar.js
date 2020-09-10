import React from 'react';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Field, Label, Control, Input } from 'react-bulma-components/lib/components/form';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let query = event.target.value
    this.setState({
      query: query
    });
    this.props.onChange(query);
  }

  render() {
    return (
      <Field>
        <Label>Recherche par nom</Label>
        <Control iconLeft iconRight>
          <Input
            placeholder="I have icons"
            name="search-input"
            type="text"
            value={ this.state.query }
            onChange={ this.handleChange } />
          <Icon align="left" icon="fas fa-search">
            <FontAwesomeIcon icon={faSearch} pull="left" />
          </Icon>
          <Icon align="right" icon="bars" />
        </Control>
        {/* <Help color="danger">enter a search term here...</Help> */}
      </Field>
    )
  }
}

export default SearchBar;