import React, { Component } from 'react';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
import logo from '../logo.svg';
import '../App.css';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.login = this.login.bind(this);
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

  render() {
    const { state } = this;
    return (
      <div className="row vh-100 login-background">
        <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
          <h1 className="text-center text-body font-weight-bold display-1">INOTE</h1>
          <h2 className="text-secondary text-center"> Your one stop shop for taking notes</h2>
          <form className="w-50 mt-5 shadow-lg p-5 rounded bg-white">
            <h1 className="text-center">Sign Up</h1>
            <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
              <small id="emailHelp" className="form-text text-muted">Already a member? Login</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
