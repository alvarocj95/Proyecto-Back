const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});


const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Tamaño máximo permitido en bytes (10MB en este caso)
  });
  
module.exports = {
    upload: upload,
};
