const db = require("../models");
const StudyGroup = require("../models/studyGroup.model");
const Role = require("../models/role.model");
const { user: User } = db;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("Student Content.");
};

exports.TutorBoard = (req, res) => {
  res.status(200).send("Tutor Content.");
};

exports.SubjectCoordinatorBoard = (req, res) => {
  res.status(200).send("Subject Coordinator Content.");
};

exports.getUser = (req, res) => {
  User.find({
    username: req.params.username
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retreiving User related to " + req.params.username });
    })
}

exports.updateStudent = (req, res) => {
  User.findOneAndUpdate({
    username: req.params.username
  }, {
    $set: {
      year: req.body.year,
      course: req.body.course,
      studentName: req.body.studentName,
      preferredName: req.body.preferredName
    }
  })
    .then(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (!req.body.year || !req.body.course) {
        return res.status(404).send({ message: "Need year and course" });
      }

      res.status(200).send({
        year: user.year,
        course: user.course,
        studentName: user.studentName,
        preferredName: user.preferredName,
        email: user.email
      });
    })
}

exports.createStudyGroup = (req, res) => {
  User.find({
    username: req.body.ownerName
  })
    .then((data) => {
      Role.find({
        _id: data[0].roles[0]
      })
        .then((x) => {
          if (x[0].name !== 'student') {
            return res.status(400).send({ message: "User is not a student" })
          }

          const studyGroup = new StudyGroup({
            owner: data[0]._id,
            ownerName: data[0].username,
            name: req.body.groupName,
            subjectName: req.body.subject
          })

          studyGroup.save((err, studyGroup) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          })
        })
    })
}

exports.getStudyGroups = (req, res) => {
  StudyGroup.find({
    $or: [{ ownerName: req.params.username },
    { members: { $in: [req.params.username] } }]
  })
    .then((data) => {
      return res.status(200).send({ data })
    })

  // need to append study groups that they are in here
}

exports.deleteStudyGroup = (req, res) => {
  StudyGroup.deleteOne({ owner: req.params.studyGroup })
    .then((data) => {
      return res.status(200).send({ message: "item deleted" });
    })
    .catch(error => {
      return res.status(500).send({ message: error });
    })
}

exports.joinStudyGroup = (req, res) => {
  StudyGroup.updateOne(
    { _id: req.body.groupId },
    {
      $push: { members: req.body.currentStudent }
    }
  )
    .then((a) => {
      console.log(a);
      return res.status(200).send({ message: "member added" });
    })
    .catch(error => {
      return res.status(500).send({ message: error })
    });
}

exports.leaveStudyGroup = (req, res) => {
  console.log(req.body)

  StudyGroup.find({ _id: req.body.groupId })
    .then((data) => {
      var updatedList = data[0].members.filter((member) => { member === req.body.currentStudent })

      StudyGroup.updateOne(
        { _id: req.body.groupId },
        {
          $set: { members: updatedList }
        })
        .then((data) => {
          console.log(data);
          return res.status(200).send({ message: "member left" });
        })
        .catch(error => {
          return res.status(500).send({ message: error })
        })
    }).catch(error => {
      return res.status(500).send({ message: error })
    })
}