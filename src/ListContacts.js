import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ListContacts extends Component {
  // types inside a class, e.g: replace "this.propTypes" by "static propTypes"
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
  clearQuery = () => {
   this.updateQuery('');
  }
  render() {
    //destructure
    const {contacts, onDeleteContact} = this.props;
    const {query} = this.state;

    //if query it's an empty string
    //then we show contacts the as the original contact
    const showingContacts = query === '' ? contacts
      : contacts.filter( (c) => (
        c.name.toLowerCase().includes(query.toLowerCase())
      ));

    const number = showingContacts.length !== contacts.length && (
      <div className="showing-contacts">
        <span>
          Now showing contact {showingContacts.length} of {contacts.length}
          <button onClick={this.clearQuery} >Show All</button>
        </span>
      </div>
    );
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="search contacts"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
          <Link 
            to="/create"
            className='add-contact'
          >add contact
          </Link>
        </div>
        <p className="num">{number}</p>
        <ol className="contact-list">
          {
          showingContacts.map(element =>
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
                onClick={() => onDeleteContact(element)}
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

