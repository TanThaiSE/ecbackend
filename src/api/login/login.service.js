const loginModel = require('./login.model');
exports.signInLocal= (username, password) => loginModel.signInLocal(username, password);
exports.findAccount = (infoForgotPass) => loginModel.findAccount(infoForgotPass);
exports.updatePassword = (password, idAcc) => loginModel.updatePassword(password, idAcc);
exports.findExistAccount = (idAcc) => loginModel.findExistAccount(idAcc);