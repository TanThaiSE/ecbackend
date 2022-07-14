const express = require('express');
const router = express.Router();

const contestsController = require('./contests.controller');

// routing goes here
router.post('/getAllContests', contestsController.listAllContests);

router.get('/getDetailContests/:id', contestsController.getDetailContests);

router.get('/getQuizInContest/:id',contestsController.getQuizInContest);

router.get('/getMemberLeaderBoard/:id',contestsController.getMemberLeaderBoard);

router.post('/addMemberRegisterContest',contestsController.addMemberRegisterContest)

router.post('/getStatusRegisterContest',contestsController.getStatusRegisterContest);

router.post('/getDefaultInfoRegisterForm',contestsController.getDefaultInfoRegisterForm);

router.post('/createQuizSubmission',contestsController.createQuizSubmission);

router.get('/testpassport',contestsController.testpassport);

router.get('/getprofile',contestsController.getProfile);

router.post('/editprofile',contestsController.editProfile);

router.post('/updateemail',contestsController.updateEmail);

router.post('/changePassword',contestsController.changePassword);
//chua viet

// router.post('/profile',contestsController.profile);
// router.post('/accountInProfile',contestsController.accountInProfile);

// router.post('/getListQuestionForQuiz',contestsController.getListQuestionForQuiz);
//
module.exports = router;