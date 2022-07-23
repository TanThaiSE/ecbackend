const productService = require('./product.service');


exports.getDetailProduct =async (req, res) => {
        const id = req.params.id;
        let product = await productService.getDetailProduct(id);
        if (product )
        return res.status(200).json(product);

        else return res.status(400).json({ msg: 'can not find product' });

}
exports.addProduct = async (req, res) => {
        let {title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount}= req.body;
        let product = await productService.addProduct(title, price,thumbnail,description,created_at,updated_at,category_id,brand,discount);

        if (product)
        return res.status(200).json({msg: 'add product success'});

        else return res.status(400).json({ msg: 'add product failed' });

}

exports.deleteProduct = async (req, res) => {
        const id= req.params.id;
        let product = await productService.deleteProduct(id);

        if (product)
        return res.status(200).json({msg: 'add product success'});

        else return res.status(400).json({ msg: 'add product failed' });

}

exports.serchProductByName =async (req, res) => {
        let name= req.body;
        let product = await productService.serchProductByName(name);

        if (product)
        return res.status(200).json(product);

        else return res.status(400).json({ msg: 'can not find any product ' });

}

