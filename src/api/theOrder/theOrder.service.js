const  theOrderModel = require('./theOrder.model');

exports.addOrder= (orderDate, status, userId, payment) => theOrderModel.addOrder(orderDate, status, userId, payment);

exports.deleteOrder =(id) => theOrderModel.deleteOrder(id);