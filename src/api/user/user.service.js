const userModel = require('./user.model');

exports.getDetailAdmin= (id) => userModel.getDetailAdmin(id);//

exports.getUserProfile =(id) =>userModel.getUserProfile(id)