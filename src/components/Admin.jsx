import React, { Component } from 'react';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
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
      <div className="row vh-100">
        <div className="col">
          <ul className="list-unstyled">
            <li className="border-top border-bottom p-3">List item 1</li>
            <li className="border-top border-bottom p-3">List item 1</li>
            <li className="border-top border-bottom p-3">List item 1</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SignUp;
