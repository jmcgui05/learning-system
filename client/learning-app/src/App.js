import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Modal from 'react-modal';

const Course = ({ course }) => {
  return (
    <li>{course.id} : {course.name} : {course.length} : {course.subject}</li>
  )
};

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      courses: [],
      modalIsOpen: false,
      name: ""
    };
  }
  async componentDidMount() {
    Modal.setAppElement('body');
    const res = await axios.get('/api/courses');
    this.setState({
      courses: res.data,
      modalIsOpen: true
    });
  }

  handleName = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    const { courses, name, modalIsOpen } = this.state;
    return (
      <div className="App">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div>Please enter your name</div>
        <form onSubmit={this.handleName}>
          <label>
            <input type="text" value={this.state.name} onChange={this.handleNameChange} />
          </label>
          <button type="submit" >Submit</button>
        </form>
        </Modal>
        {!modalIsOpen && name.length ? <h2>Hello: {name}</h2> : null}
        {!modalIsOpen && name.length ? courses.map((course) => {
          return <Course key={course.id} course={course}/>
        }) : null}
      </div>
    );
  }
}

export default App;
