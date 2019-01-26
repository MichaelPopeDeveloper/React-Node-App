import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from "react-router-dom";
import Notes from './Notes';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
import '../App.css';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      notes: [],
      clickedNote: {},
      ShouldRedirectToNote: false,
    };
    // this.login = this.login.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.redirectToNotes = this.redirectToNotes.bind(this);
    this.logNoteValue = this.logNoteValue.bind(this);
  }

  componentWillMount() {
    // fetch('/user/profile')
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err));

    // axios.get('/user/profile')
    //   .then(res => console.log(res))
    //   .catch(a => console.log(a));

    // axios.post('/user/signUp', {
    //   name: 'Michael',
    //   email: 'michaelpopedeveloper@gmail.com',
    //   password: 'password123',
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    // this.login();
    this.getNotes();
  }


  getNotes() {
    console.log('get Notes');
    const token = localStorage.getItem('token');
    axios.post('/user/notes', {
      token,
    })
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        console.log('Admin upper scope!');
        if (token) {
          const decodedToken = tokenHelper.decodeToken(token);
          const { name, notes } = decodedToken;
          console.log({ notes });
          this.setState({ name, notes });
        } else {
          console.log(false);
          return false;
        }
      })
      .catch(err => console.log(err));
  }

  logNoteValue(note) {
    const { state } = this;
    const { target } = note;
    this.setState({ ShouldRedirectToNote: true });
    this.setState({ clickedNote: target });
    console.log(`Should redirect: ${state.ShouldRedirectToNote}`);
    console.log(target);
    console.log('redirect');
  }

  redirectToNotes() {
    const { state } = this;
    return (
      <Redirect
        to={{
          pathname: '/notes',
          state: { note: state.clickedNote },
        }}
      />
    );
  }


  render() {
    const { state } = this;

    const listNotes = state.notes.map((note) => {
      return <li title={note.title} data-key={note._id} onClick={this.logNoteValue} className="border-top border-bottom p-3">{note.title}</li>;
    });
    if (state.ShouldRedirectToNote) return <Redirect to={{ pathname: '/notes', data: { note: state.clickedNote } }} />;

    return (
      <div className="row vh-100">
        <div className="col w-100 d-flex flex-column justify-content-start align-items-center align-content-center">
          <Link to="/notes"><button className="btn btn-primary m-5" onClick={this.redirectToNotes}>Add Note</button></Link>
          <ul className="list-unstyled w-100">{listNotes}</ul>
        </div>
      </div>
    );
  }
}

export default Admin;
