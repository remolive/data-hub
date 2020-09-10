import React from 'react';
import { Section, Hero, Container, Heading, Table } from 'react-bulma-components';

class RecordPreview extends React.Component {
  columns() {
    return this.props.record.content.map((item, index) => (
      <th key={index} ><abbr title={ item }>{ item }</abbr></th>
    ));
  }

  render() {
    return (
      <Section>
        <Hero color="primary" onClick={ this.props.onClick } >
          <Hero.Body>
            <Container>
              <Heading>
                { this.props.record.title }
              </Heading>
              <Heading subtitle size={3}>
                { this.props.record.description }
              </Heading>
              <Table>
                <thead>
                  <tr>
                    { this.columns() }
                  </tr>
                </thead>
              </Table>
            </Container>
          </Hero.Body>
        </Hero>
      </Section>
    )
  }
}

export default RecordPreview;