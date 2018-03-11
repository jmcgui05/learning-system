const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const util = require('util');
const fs = require('fs');
const readStream = fs.createReadStream(__dirname + '/courses.txt');
let count = 0;

router.use((req, res, next) => {
  count++;
  console.log('API hit count = %s', count);
  next();
});

router.route('/load')
  .get((req, res) => {
    let data = '';
    readStream.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
        data = data.split("\n");
        let itemised = [];
        let formatted = [];
        let tempObj = {
          "_id": 0,
          "name": "",
          "length": 0,
          "subject": ""
        };
        data.forEach((str) => {
          itemised.push(str.split(' '));
        })
        itemised.forEach((innerArr) => {
          while (innerArr.length > 4) {
            innerArr[1] = `${innerArr[1]} ${innerArr.splice(2, 1)}`;
          }
          const obj = innerArr.reduce((acc, cur, i) => {
            let tempKeys = Object.keys(tempObj);
            acc[tempKeys[i]] = cur;
            return acc;
          }, {});
          obj["_id"] = parseInt(obj["_id"]);
          obj["length"] = parseInt(obj["length"]);
          formatted.push(obj);
        });
        res.json(formatted);
    });
  });

// /courses post(create new course) get(list all courses)
router.route('/courses')
  .post((req,res) => {
    let course = new Course();
    course._id = req.body._id;
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
router.route('/courses/:id')
  .get((req, res) => {
    const query = { _id: req.params._id };
    Course.findOne(query, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json(course);
      }
    });
  })
  .put((req, res) => {
    const query = { _id: req.body._id };
    Course.findOne(query, (err, course) => {
      if (err) {
        res.send(err);
      }
      if (course) {
        course._id = req.body._id;
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
      } else {
        res.json({message: "Could not find course to update."});
      }
    });
  })
  .delete((req, res) => {
    Course.remove({ _id: req.params._id }, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });

module.exports = router;
