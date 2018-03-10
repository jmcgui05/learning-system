
# Learning App

An Application to simulate a learning system to allow create, edit, list and search of courses.

## Getting Started

1. Git clone this repo to your local machine
2. Open a terminal and run mongod to run a local mongo instance
3. Open another terminal and run npm install
4. In this same terminal run npm run dev

## Expected Functionality

1. Load the data from the provided .txt file (take name spaces into consideration)
2. The user should be prompted for their Name
3. After entering, the course list should be loaded and the user prompted what action they would like (add, edit, list, search)
4.
* Add: the program should prompt the user to add a course. Once the choice has been
made, your program should request the user to input all the required fields for the
course and add the course to the previously defined list.
* Edit: the program should first list the courses and prompt the user for an id to edit. Once
the user inputs an id, the program should prompt the user for a field to edit and an edit
value. Then the program should update the field with the new edit.
* List: the program should list all the courses.
* Search: the program should take in any input and search the courses and list any
courses with matching fields (all the fields should be searched)
