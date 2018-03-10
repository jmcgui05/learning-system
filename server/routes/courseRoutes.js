const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const util = require('util');
const fs = require('fs');
const readline = require('readline').createInterface({
  input: fs.createReadStream(__dirname + '/courses.txt')
});

let count = 0;

function getData() {
  return new Promise((resolve, reject) => {
    let data = [];
    let itemised = [];
    let formatted = [];
    let tempObj = {
      "id": 0,
      "name": 0,
      "length": 0,
      "subject": ""
    };
    readline.on('line', (line) => {
      data.push(line);
    });
    readline.on('close', () => {
      data.forEach((str) => {
        itemised.push(str.split(' '));
      })
      itemised.forEach((innerArr) => {
        while (innerArr.length > 4) {
          innerArr[1] = `${innerArr[1]} ${innerArr.splice(2, 1)}`;
        }
        const obj = innerArr.reduce(function(acc, cur, i) {
          let tempKeys = Object.keys(tempObj);
          acc[tempKeys[i]] = cur;
          return acc;
        }, {});
        formatted.push(obj);
      });
      return resolve(formatted);
    });
  })
}

router.use((req, res, next) => {
  count++;
  console.log('API hit count = %s', count);
  next();
});

router.route('/load')
  .get((req, res) => {
    getData()
      .then((result) => {
        res.json(result);
      })

  })

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
router.route('/courses/:id')
  .get((req, res) => {
    const query = { id: req.params.id };
    Course.findOne(query, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json(course);
      }
    });
  })
  .put((req, res) => {
    const query = { id: req.params.id };
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
    Course.remove({ id: req.params.id }, (err, course) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: 'Successfully deleted' });
      }
    });
  });

module.exports = router;
