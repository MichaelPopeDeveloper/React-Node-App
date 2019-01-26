import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import * as axios from 'axios';
import * as localStorage from '../dir/helper/localStorage';
import * as tokenHelper from '../dir/helper/JWT';
import logo from '../logo.svg';
import '../App.css';

const Button = withRouter(({ history, ...props }) => (
  <button
    className={props.className}
    {...props}
    type="button"
    onClick={() => {
      history.push('/protected');
      props.buttonFunc();
    }}
  >
    Save
  </button>
));

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // name: '',
      title: '',
      note: '',
      placeHolderNote: null,
      selectedNoteID: '',
    };
    this.login = this.login.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNoteSave = this.handleNoteSave.bind(this);
    this.getSelectedNote = this.getSelectedNote.bind(this);
  }

  componentWillMount() {
    const { props } = this;
    console.log('Passed note data: ');
    if (props.location.data && props.location.data.note.dataset.key) console.log(props.location.data.note.dataset.key);

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
    //  console.log(this.props.location.state);
    // this.login();
    this.getSelectedNote();
  }

  getSelectedNote() {
    const { props, state } = this;
    const token = tokenHelper.decodeToken(localStorage.getItem('token'));
    const { email } = token;
    if (props.location.data && props.location.data.note.dataset.key) {
      const noteID = props.location.data.note.dataset.key;
      const newToken = tokenHelper.signToken({ email, noteID });
      axios.post('/user/getNoteByID', {
        token: newToken,
      })
        .then((res) => {
          const { token } = res.data;
          const decodedToken = tokenHelper.decodeToken(token);
          const { notes } = decodedToken.token;
          console.log('response data');
          console.log(res.data);
          if (notes) {
            notes.forEach(_note => {
            //  console.log(_note);
              if (_note._id == noteID) {
                this.setState({ placeHolderNote: _note });
                this.setState({ note: _note.note });
                this.setState({ title: _note.title });
                this.setState({ selectedNoteID: noteID })
                console.log('This is the retrieved note:');
                console.log(this.state.placeHolderNote)
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    }
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

  handleNoteSave() {
    // event.preventDefault();
    const { email } = tokenHelper.decodeToken(localStorage.getItem('token'));
    console.log('decoded token:');
    console.log(tokenHelper.decodeToken(localStorage.getItem('token')));
    const { title, note, placeHolderNote, selectedNoteID } = this.state;
    let newToken;
    if (placeHolderNote) {
      newToken = tokenHelper.signToken({ email, note: { note, title, _id: selectedNoteID } });
    } else {
      newToken = tokenHelper.signToken({ email, note: { note, title, _id: selectedNoteID } });
    }
    axios.post('/user/createNote', {
      token: newToken,
    })
      .then((res) => {
        const { noteSaved } = res.data;
        console.log(res.data);
        console.log(tokenHelper.decodeToken(res.data.token));
        if (noteSaved) {
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
    console.log(this.state.note);
    console.log(this.state.title);
    console.log(this.state.selectedNoteID);
  }

  render() {
    const { state } = this;
    return (
      <div className="row vh-100 login-background">
        <div className="col d-flex flex-column justify-content-start align-items-center align-content-center">
          {/* <h1 className="text-center text-body font-weight-bold display-1">INOTE</h1>
          <h2 className="text-secondary text-center"> Your one stop shop for taking notes</h2> */}
          <form className="w-100 mt-5  p-5 rounded bg-white">
            {/* <h1 className="text-center">Create Note</h1> */}
            <div className="form-group">
              <label>Title</label>
              <input onChange={this.handleTitleChange} type="text" className="form-control" style={
                {
                  border: '0px solid #ced4da',
                }
              } id="NoteTitle" aria-describedby="emailHelp" placeholder="Enter title here..." value={
                state.title
              } />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Note</label>
              <textarea value= {state.note} onChange={this.handleNoteChange} class="form-control h-75" id="exampleFormControlTextarea1" style={
                {
                  border: '0px solid #ced4da',
                }
              } placeholder="Enter note here..."  rows="18"></textarea>
            </div>
            <Button className="btn btn-primary" buttonFunc={this.handleNoteSave} />
            {/* <button type="submit" className="btn btn-primary">Save</button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default Notes;
