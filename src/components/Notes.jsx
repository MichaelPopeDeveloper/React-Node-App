import React, { Component } from 'react';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
import logo from '../logo.svg';
import '../App.css';

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      title: '',
      note: '',
    };
    this.login = this.login.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
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
    this.login();
  }

  login() {
    axios.post('/user/login', {
      name: 'Michael',
      email: 'michaelpopedeveloper@gmail.com',
      password: 'password123',
    })
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        const decodedToken = tokenHelper.decodeToken(token);
        if (token) {
          localStorage.setItem('token', token);
          this.setState({ name: decodedToken.name });
        }
      })
      .catch(err => console.log(err));
  }

  handleNoteSave(event) {
    event.preventDefault();
    const { email } = tokenHelper.decodedToken(localStorage.getItem('token'));
    const { title, note } = this.state;
    const newToken = tokenHelper.signToken({ email, title, note });
    axios.post('/user/createNote', {
      token: newToken,
    })
      .then((res) => {
        const { authenticated } = res.data;
        console.log(authenticated);
        if (authenticated) {
          this.isAuthenticated = true;
          // cb(this.isAuthenticated);
        } else {
          // cb(this.isAuthenticated);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    // return isAuthenticated;
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleNoteChange(event) {
    this.setState({ note: event.target.value });
  }



  render() {
    const { state } = this;
    return (
      <div className="row vh-100 login-background">
        <div className="col d-flex flex-column justify-content-start align-items-center align-content-center">
          {/* <h1 className="text-center text-body font-weight-bold display-1">INOTE</h1>
          <h2 className="text-secondary text-center"> Your one stop shop for taking notes</h2> */}
          <form className="w-100 mt-5  p-5 rounded bg-white">
            <h1 className="text-center">Create Note</h1>
            <div className="form-group">
              <label>Title</label>
              <input onChange={this.handleTitleChange} type="text" className="form-control" id="NoteTitle" aria-describedby="emailHelp" placeholder="Title" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Note</label>
              <textarea onChange={this.handleNote} class="form-control h-75" id="exampleFormControlTextarea1" placeholder="Note..." rows="18"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Notes;
