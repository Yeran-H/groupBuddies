module.exports = app => {
    const tutor = require("../controllers/tutor.controller");
    var router = require("express").Router();
  
    // Retrieves all Tutors 
    router.get('/view', tutor.findAllTutors)

    // Retrieves all Tutors in the CreateNewSubject page
    router.get('/findTutorials/:_id', tutor.findTutorials)

    router.get('/findTutorial/:_id', tutor.getTutorial)

    router.get('/find/:_id', tutor.getTutor)

    router.get('/getUnListedStudent/:_id', tutor.getUnListedStudent)

    router.get('/getlistGroups/:_id', tutor.getlistGroups)

    router.get('/getGroup/:_id', tutor.getGroup)

    router.post("/autoSort/:id", tutor.autoSort);

    // Add Group
    router.put("/addGroup", tutor.addGroup);

    // Remove Group
    router.post("/removeGroup", tutor.removeGroup);

    // Add Student Group
    router.post("/addStudentGroup", tutor.addStudentGroup);

    router.post("/removeStudentGroup", tutor.removeStudentGroup);
  
    app.use('/api/tutor', router);
  };
  