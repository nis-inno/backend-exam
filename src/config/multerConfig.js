const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // if(file)
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      // if(file)
        cb(
          null,
          new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    },
  });

  const filefilter = (req, file, cb) => {
    if (file && !file.originalname.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!';
        return cb(new Error('Only pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!'), false);
    }
    // if (
    //   file.mimetype === 'image/png' ||
    //   file.mimetype === 'image/jpg' ||
    //   file.mimetype === 'image/jpeg'
    // ) {
    //   cb(null, true);
    // } 
    else {
      cb(null, true);
    }
  };
  
  const upload = multer({ storage: storage, filefilter: filefilter });
    // const upload = multer({ storage: storage});

  module.exports = upload