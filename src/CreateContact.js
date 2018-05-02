import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import { Route, BrowserRouter  } from 'react-router-dom';

import ListContacts from './ListContacts';
import ImageInput from './ImageInput';


export default class CreateContact extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });

    if (this.props.onCreateContact) {
      this.props.onCreateContact(values);
    }
  }

  render() {
    return (
      <div className='CreateContact'>
        <Link className="close-create-contact" to='/'>
          Close / Home
        </Link>
        <form className="create-contact-form" onSubmit={this.handleSubmit} >
          <ImageInput 
            className="create-contact-avatar-input"
            name='avatarURL'
            maxHeight={64}
          />
          <div className="create-contact-details">
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='handle' placeholder='Handle' />
            <button>add contact}</button>
          </div>
        </form>
      </div>
    );
  }
}
