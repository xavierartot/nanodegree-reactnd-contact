import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListContacts extends Component {
  // types inside a class, e.g: replace this.propTypes by static propTypes
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  }
  updateQuery = (e) => {
    console.log(e);
    this.setState(() => ({ // after the call of setState() ListContacts re-render is methods render()
      query: e.trim(),
    }));
  }
  render() {
    return (
      <div className="list-contacts">
        {JSON.stringify(this.state)}
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search contacts"
            value={this.state.query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div>
        <ol className="contact-list">
          {
          this.props.contacts.map(element =>
          (
            <li key={element.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${element.avatarURL})`,
                  }}
              />
              <div className="contact-details">
                <p>
                  {element.name }
                </p>
                <p>{element.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => this.props.onDeleteContact(element)}
              >remove
              </button>
            </li>
            ))
          }
        </ol>
      </div>
    );
  }
}

