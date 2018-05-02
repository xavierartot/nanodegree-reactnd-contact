import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

export default class App extends Component {
  state = {
    contacts: [],
  }
  //fetch data always in lifecycle
  //ajax/api request should be in componentDidMount
  componentDidMount() {
    ContactAPI.getAll()//fetchind the data from remote server
      .then((contacts) => { //with the answer we're calling setState
        this.setState(() => ({
          contacts
        }));
      });
  }
   removeContact = (contact) => {
     // where the id is not equal to id clicked
     this.setState(currentState => ({
       // loop through the contacts array, then each id of the state
       // removeContact(contact.id)
       contacts: currentState.contacts.filter(c => (c.id !== contact.id)),
     }));
     ContactAPI.remove(contact);
   }
  createContact = (contact) => {
    ContactAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => ({
          contacts: currentState.contacts.concat([contact])
        }));
      });
  }
   render() {
     return (
       <div className="App">
         <Route
           path='/'
           exact
           render={() => (
             <ListContacts
               contacts={this.state.contacts}
               onDeleteContact={this.removeContact}
             />
           )}
         />
         <Route
           path='/create'
           render={({ history }) => (
             <CreateContact
               onCreateContact={(contact) => {
              this.createContact(contact);
              history.push('/');
            }}
             />
        )}
         />
       </div>
     );
   }
}
