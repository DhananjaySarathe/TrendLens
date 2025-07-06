// middlewares/uploadMiddleware.js
import multer from 'multer';

// Use memory storage so file is kept in memory as a Buffer
const storage = multer.memoryStorage();

// Configure multer upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit (optional)
  },
  fileFilter: (req, file, cb) => {
    // Optional: accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

export default upload;
