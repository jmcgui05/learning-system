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
      newCourse: {},
      courses: [],
      modalIsOpen: false,
      user: ""
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
      user: event.target.value,
    })
  }

  handleNewCourse = async (event) => {
    event.preventDefault();
    const res = await axios.post('/api/courses', this.state.newCourse);
    this.setState({
      newCourse : {
        id: "",
        name: "",
        subject: "",
        length: ""
      }
    })
  }

  handleCourseChange = (field, event) => {
     const { newCourse } = this.state;
     newCourse[field] = event.target.value;
     this.setState({
       ...newCourse
     })
  }

  handleEditCourse = async (event) => {
    event.preventDefault();
    const res = await axios.put(`/api/courses/${this.state.newCourse.id}`, this.state.newCourse);
    this.setState({
      newCourse : {
        id: "",
        name: "",
        subject: "",
        length: ""
      }
    })
  }

  handleListCourses = async () => {
    const res = await axios.get('/api/courses');
    this.setState({
      courses: res.data,
    });
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    const { courses, user, modalIsOpen, newCourse } = this.state;
    return (
      <div className="App">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
        <div>Please enter your name</div>
        <form onSubmit={this.handleName}>
          <label>
            <input type="text" value={this.state.user} onChange={this.handleNameChange} />
          </label>
          <button type="submit" >Submit</button>
        </form>
        </Modal>
        {!modalIsOpen && user.length ? <h2>Hello: {user}</h2> : null}
        {!modalIsOpen && user.length ? courses.map((course) => {
          return <Course key={course.id} course={course}/>
        }) : null}
        <form>
          <input type="text" value={newCourse.id} placeholder="ID" onChange={(event) => this.handleCourseChange("id", event)}/>
          <input type="text" value={newCourse.name} placeholder="Name" onChange={(event) => this.handleCourseChange("name", event)}/>
          <input type="text" value={newCourse.subject} placeholder="Subject" onChange={(event) => this.handleCourseChange("subject", event)}/>
          <input type="text" value={newCourse["length"]} placeholder="Length" onChange={(event) => this.handleCourseChange("length", event)}/>
          <button onClick={this.handleNewCourse}>Add Course</button>
          <button onClick={this.handleEditCourse}>Edit Course</button>
          <button onClick={this.handleListCourses}>List Courses</button>
          <button onClick={this.handleSearchCourse}>Search Courses</button>
        </form>
      </div>
    );
  }
}

export default App;
