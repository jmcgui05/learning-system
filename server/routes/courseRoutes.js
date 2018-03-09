const express = require('express');
const router = express.Router();
const Course = require('../models/course');

let count = 0;

router.use((req, res, next) => {
  count++;
  console.log('API hit count = %s', count);
  next();
});

// /courses post(create new course) get(list all courses)
router.route('/courses')
  .post((req,res) => {
    let course = new Course();
    course.id = req.body.id;
    course.name = req.body.name;
    course.length = req.body.length;
    course.subject = req.body.subject;

    //save the course and checkfor errors
    course.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.json({message: "Course created successfully"});
      }
    });
  })
  .get((req, res) => {
    Course.find((err, courses) => {
      if (err) {
        res.send(err);
      } else {
        res.json(courses);
      }
    });
  });

// /courses/:name route to get specific course and put to update
//TODO make unique courseId and assign to Mongo _id
router.route('/courses/:_id')
  .get((req, res) => {
    const query = {_id: req.params._id};
    Course.findOne(query, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json(course);
      }
    });
  })
  .put((req, res) => {
    const query = {_id: req.params._id};
    Course.findOne(query, (err, course) => {
      if (err) {
        res.send(err);
      }
      course.id = req.body.id;
      course.name = req.body.name;
      course.length = req.body.length;
      course.subject = req.body.subject;

      course.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({message: "course Updated"});
        }
      });
    });
  })
  .delete((req, res) => {
    course.remove({
        _id: req.params._id
    }, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });

module.exports = router;
