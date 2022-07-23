const theOrderService = require('./theOrder.service');

exports.addOrder =async (req, res) => {
        let {orderDate, status, userId, payment} = req.body;
        let order= await theOrderService.addOrder(orderDate, status, userId, payment);
        if (order)
        return res.status(200).json({msg: 'add order success'});

        else return res.status(400).json({ msg: 'add order failed' });

}

exports.deleteOrder =async (req, res) => {
    const id = req.params.id;
    let order= await theOrderService.deleteOrder(id);
    if (order)
    return res.status(200).json({msg: 'delete order success'});

    else return res.status(400).json({ msg: 'delete order failed' });

}