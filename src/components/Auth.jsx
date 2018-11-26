import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import Admin from './Admin';
import Notes from './Notes';
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        {/* <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul> */}
        <Route path="/public" component={Public} />
        <Route path="/notes" component={Notes} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/protected" component={Admin} />
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  async checkToken(cb) {
    const localToken = localStorage.getItem('token');
    const isAuthenticated = await axios.post('/user/checkToken', {
      token: localToken,
    })
      .then((res) => {
        const { authenticated } = res.data;
        console.log(authenticated);
        if (authenticated) {
          this.isAuthenticated = true;
          cb(this.isAuthenticated);
        } else {
          cb(this.isAuthenticated);
          return false;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return isAuthenticated;
  },
  login(credentials, cb) {
    axios.post('/user/login', {
      email: credentials.email,
      password: credentials.password,
    })
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        if (token) {
          localStorage.setItem('token', token);
          this.isAuthenticated = true;
          cb(this.isAuthenticated);
        } else {
          cb(this.isAuthenticated);
          return false;
        }
      })
      .catch(err => console.log(err));
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <p>You are not logged in.</p>
      )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

function Public() {
  return <h3>Public</h3>;
}

function Protected() {
  return <h3>Protected</h3>;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      email: '',
      password: '',
    };
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePaswordChange = this.handlePaswordChange.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  componentWillMount() {
    this.checkToken();
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handlePaswordChange(event) {
    this.setState({ password: event.target.value });
  }


  login(credentials) {
    fakeAuth.login(credentials, (isAuth) => {
      this.setState({ redirectToReferrer: isAuth });
    });
  }

  checkToken() {
    fakeAuth.checkToken((auth) => {
      this.setState({ redirectToReferrer: auth });
      console.log(`check token: ${auth}`);
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;
    const { email, password } = this.state;

    if (redirectToReferrer) return <Redirect to={"/protected"} />;

    return (
      <div className="row vh-100 login-background">
        <div className="col d-flex flex-column justify-content-center align-items-center align-content-center">
          <h1 className="text-center text-body font-weight-bold display-1">INOTE</h1>
          <h2 className="text-secondary text-center"> Your one stop shop for taking notes</h2>
          <form className="w-50 mt-5 shadow-lg p-5 rounded bg-white"
            onSubmit={(event) => {
              event.preventDefault();
              this.login({ email, password });
            }}>
            <h1 className="text-center">Login</h1>
            <div className="form-group">
              <label>Email address</label>
              <input value={email} onChange={this.handleEmailChange} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input value={password} onChange={this.handlePaswordChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <div className="form-group">
              <small id="emailHelp" className="form-text text-muted">Not a member? SignUp</small>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthExample;
