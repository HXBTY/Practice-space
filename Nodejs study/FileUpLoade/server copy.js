const express = require('express');
const path = require('path');
const multer = require('multer');
const sr = require('string-random');

let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // 设置本地存储地址
      callback(null, path.join(__dirname, '/uploads'));
    },
    filename: (req, file, callback) => {
      // 设置文件的名称
      callback(null, sr(14) + file.originalname);
    }
  })
});
let app = express();
app.post('/FileUpLoade', upload.single('file'), (req, res) => {
  res.send('ok');
})
app.listen(8181, () => {
  console.log('8181.......');
  
})