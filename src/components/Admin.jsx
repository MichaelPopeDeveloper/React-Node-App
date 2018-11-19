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
    };
    // this.login = this.login.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.redirectToNotes = this.redirectToNotes.bind(this);
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
          this.setState({ name, notes });
        } else {
          console.log(false);
          return false;
        }
      })
      .catch(err => console.log(err));
  }

  redirectToNotes() {
    console.log('redirecting!!');
    return <Redirect to={"/notes"} />;

  }


  render() {
    const { state } = this;
    return (
      <div className="row vh-100">
        <div className="col w-100 d-flex flex-column justify-content-start align-items-center align-content-center">
          <button className="btn btn-primary m-5" type="text" onClick={this.redirectToNotes}>Add Note</button>
          <Link to="notes">Notes</Link>
          <ul className="list-unstyled w-100">
            <li className="border-top border-bottom p-3">List item 1</li>
            <li className="border-top border-bottom p-3">List item 1</li>
            <li className="border-top border-bottom p-3">List item 1</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Admin;
