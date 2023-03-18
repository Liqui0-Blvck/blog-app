import express from 'express';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';



const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({ storage })


app.post('/api/upload', upload.single('file'), (req, res) => {
  
  res.status(200).json(req.file.filename);
});


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.listen(8800, () => {
  console.log('Example app listening on port 8800!')
})