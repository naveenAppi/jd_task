const Product = require('../Models/ProductModel');


module.exports = {
    addProduct: async (req, res, next) => {
        const { productname, unitOfMeasurement, description, price } = req.body;
    

        try {     
        if ('id' in req.body) {
            let result = await  Product.findByIdAndUpdate({ _id: req.body.id }, {   productname, unitOfMeasurement, description, price
                , imagePath:req.file.filename
            });  
            return res.status(200).json(result);
      } else {
          const product = new Product({
              productname, unitOfMeasurement, description, price
              ,imagePath:req.file.filename
          });
          await product.save().then(result => res.json(result));
      }
        } catch (error) {
            return res.status(401).json(error)
        }
     
        
    },

    getProduct: async (req, res, next) => {

        var pageOptions = {
            page: parseInt(req.query.page) || 0,
            limit:parseInt( req.query.limit) || 10
        }
        try {
            const product = await Product.paginate({}, pageOptions);
            return res.status(200).json( product);
            
        } catch (error) {
            return res.status(401).json(error)
        }
        
    },

    destroyProduct: async (req, res, next) => {
        const { id } = req.params;
        try {
            const product = await Product.deleteOne({ _id: id })
            return res.status(200).json({"message":"record deleted successfully"})
        } catch (error) {
            return res.status(401).json(error)
        }
    }
}