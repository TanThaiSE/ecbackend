const loginModel = require('./login.model');
exports.signInLocal= (username, password) => loginModel.signInLocal(username, password);

exports.register = (fullName,phoneNumber,email,password,address) =>loginModel.register(fullName,phoneNumber,email,password,address);