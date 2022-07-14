const contestsModel = require('./contests.model');
exports.getDetailContests = (id) => contestsModel.getDetailContests(id);//
exports.getContestLanguage = () => contestsModel.getContestLanguage();//
exports.getQuizInContest = (id, currentTime) => contestsModel.getQuizInContest(id, currentTime);//
exports.getMemberLeaderBoard = (id) => contestsModel.getMemberLeaderBoard(id);
exports.addMemberRegisterContest = (registerContest) => contestsModel.addMemberRegisterContest(registerContest);
exports.getStatusRegisterContest = (statusContest) => contestsModel.getStatusRegisterContest(statusContest);
exports.getDefaultInfoRegisterForm = (inforRegisterForm) => contestsModel.getDefaultInfoRegisterForm(inforRegisterForm);
exports.createQuizSubmission = (quizSubmission) => contestsModel.createQuizSubmission(quizSubmission);
exports.getProfile = (idAccount) => contestsModel.getProfile(idAccount);
exports.editProfile = (idAccount, bio) => contestsModel.editProfile(idAccount, bio);
exports.updateEmail = (idAccount, email) => contestsModel.updateEmail(idAccount, email);
exports.getCurrentPassword = (idAccount) => contestsModel.getCurrentPassword(idAccount);
exports.updatePassword = (passwordHash, idAccount) => contestsModel.updatePassword(passwordHash, idAccount);