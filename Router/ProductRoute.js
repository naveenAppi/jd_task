const router = require('express-promise-router')();
const productController = require('../Controller/productController');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./jd_frontend/public/assets/images")
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });


router.route('/')
    .get(productController.getProduct)
    .post(upload.single('imagePath'), productController.addProduct)

router.route('/:id')
      .post(productController.destroyProduct)



module.exports = router;