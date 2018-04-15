
# Learning App

An Full MERN stack Application to simulate a learning system to allow users to create, edit, list and search of courses. This is a toy app built to gain further exposure in React.

## Assumptions

1. The initial file will always be a text file named courses.txt.
2. Each line that represents a course will always be limited to 4 fields.

## Requirements

1. Node (7.2.0)
2. Mongo

## Getting Started

1. Git clone this repo to your local machine
2. Open a terminal and run mongod to run a local mongo instance
3. Open another terminal and run npm install
4. To install client dependencies, run cd client, then run npm install.
5. Run cd ..
6. Run npm run dev

## Learning Application Functionality

1. You will be prompted to enter your name.
2. After submitting your name, the supplied course.txt file should load into the Course List table.
3. Enter a Course Name, Course ID, Course Subject and Course Length, followed by clicking the Add Course button.
4. To view an updated Course List, click List Courses.
5. To Edit a Course, Enter the Course Id of the course to edit, and update any other field, then click Edit Course.
6. To search for a specific course, enter a value into any of the available fields and click Search Courses.

## Further Enhancements to make

1. Improve reading of text file into the application.
2. Use React client side error handling instead of alerting.
3. Fix the bulk post of data rather than making a single request per course (current implementation is for demo purposes only).
4. Styling must be greatly improved.
5. Implement Redux for application state.
