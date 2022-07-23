
const userService = require('./user.service');

exports.getDetailAdmin = async (req, res) => {
        const id = req.params.id;
        let admin= await userService.getDetailAdmin(id);

        if (admin)
        return res.status(200).json(admin);

        else return res.status(400).json({ msg: 'Cannot find admin' });
    
} 

exports.getUserProfile = async (req, res) => {
        const id = req.params.id;
        let user= await userService.getUserProfile(id);

        if (user)
        return res.status(200).json(user);

        else return res.status(400).json({ msg: 'Cannot find admin' });
    
} 

