const e = require('express');
const categoryService = require('./category.service');

exports.getDetailCategory = async (req, res) => {
        const id = req.params.id;
        let category= await categoryService.getDetailCategory(id);

        if (category)
        return res.status(200).json(category);

        else return res.status(400).json({ msg: 'Cannot find any products' });
    
}

