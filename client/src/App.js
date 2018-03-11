import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Course from './components/Course';
import './App.css';

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
      courseForm: {},
      courses: [],
      favoriteCourses: [],
      modalIsOpen: false,
      user: ""
    };
  }
  async componentDidMount() {
    Modal.setAppElement('body');
    const res = await axios.get('/api/load');
    //temp workaround until bulk post is fixed
    res.data.forEach((singleCourse) => {
      axios.post('/api/courses', singleCourse);
    })
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
    const requiredKeys = ["_id", "name", "subject", "length"];
    const isValid = requiredKeys.every((key) => {
      return this.state.courseForm.hasOwnProperty(key);
    });
    if(isValid) {
      const res = await axios.post('/api/courses', this.state.courseForm);
      this.setState({
        courseForm : {}
      })
    } else {
      alert('All Courses require an id, name, subject, length');
    }

  }

  handleCourseChange = (field, event) => {
     const { courseForm } = this.state;
     courseForm[field] = event.target.value;
     this.setState({
       ...courseForm
     })
  }

  handleEditCourse = async (event) => {
    event.preventDefault();
    const res = await axios.put(`/api/courses/${this.state.courseForm._id}`, this.state.courseForm);
    if (res.data.message === "Could not find course to update") {
      alert("Could not find course to update");
    }
    this.setState({
      courseForm : {}
    })
  }

  handleListCourses = async (e) => {
    e.preventDefault();
    const res = await axios.get('/api/courses');
    this.setState({
      courses: res.data,
    });
  }

  handleSearchCourse = (event) => {
    event.preventDefault();
    const { courseForm, courses } = this.state;
    let field = Object.keys(courseForm)[0];
    let result = courses.filter((course)=> {
      if (course[field] === courseForm[field]) {
        return course;
      }
    });
    this.setState({
      courses: result,
      courseForm: {}
    })
  }

  handleFavorites = (event) => {
    event.preventDefault();
    const { courseForm, courses, favoriteCourses } = this.state;
    const fave = courses.find((course) => {
      return parseInt(courseForm._id) === course._id;
    });
    const newFavourites = favoriteCourses.concat([fave]);
    this.setState({
      favoriteCourses: newFavourites,
      courseForm: {}
    }, () => {this.handleTotals()});
  }

  handleTotals = () => {
    const { favoriteCourses } = this.state;
    let hours = 0;
    let courseCount = 0;

    favoriteCourses.forEach((element) => {
      courseCount++;
      hours += element["length"];
    })
    alert(`You have signed up for ${courseCount} with a total of ${hours}`);
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }

  render() {
    const { courses, favoriteCourses, user, modalIsOpen, courseForm } = this.state;
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
        <div>
          {!modalIsOpen && user.length ? <h2>Hello: {user}</h2> : null}
          <table className="courseTable">
            <caption>Course List</caption>
            <tbody>
              <tr>
                <th>Course id</th>
                <th>Course Name</th>
                <th>Course Length</th>
                <th>Course Subject</th>
              </tr>
              {!modalIsOpen && user.length ? courses.map((course) => {
                return <Course key={course._id} course={course}/>
              }) : null}
            </tbody>
          </table>
        </div>
        <div>
          <table className="favoritesTable">
          <caption>Favorite Courses</caption>
            <tbody>
              <tr>
                <th>Course id</th>
                <th>Course Name</th>
                <th>Course Length</th>
                <th>Course Subject</th>
              </tr>
              {!modalIsOpen && user.length ? favoriteCourses.map((course) => {
                return <Course key={course._id} course={course}/>
              }) : null}
            </tbody>
          </table>
        </div>

        <form className="userform">
          <input type="text" value={courseForm.id} placeholder="Course ID" onChange={(event) => this.handleCourseChange("_id", event)}/>
          <input type="text" value={courseForm.name} placeholder="Course Name" onChange={(event) => this.handleCourseChange("name", event)}/>
          <input type="text" value={courseForm.subject} placeholder="Course Subject" onChange={(event) => this.handleCourseChange("subject", event)}/>
          <input type="text" value={courseForm["length"]} placeholder="Course Length" onChange={(event) => this.handleCourseChange("length", event)}/>
          <button onClick={this.handleNewCourse}>Add Course</button>
          <button onClick={this.handleEditCourse}>Edit Course</button>
          <button onClick={this.handleListCourses}>List Courses</button>
          <button onClick={this.handleSearchCourse}>Search Courses</button>
          <button onClick={this.handleFavorites}>Add to Favorites</button>
        </form>
      </div>

    );
  }
}

export default App;
