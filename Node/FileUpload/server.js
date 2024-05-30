const express = require('express');
const path = require('path');
// post上传文件，需要使用multer的中间件进行处理
const multer = require('multer');
// 用来生成随机字符串的包 string-random
const sr = require('string-random');

// 对于multer进行配置
// 设置上传文件的保存位置
// 设置上传文件的名称
// 语法：let upload = multer({ dast: './uploads})
let upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // callback的参数
      // - 参数1：是错误信息，如果设置了就无法正常保存，，因此写null；
      // - 参数2：是保存位置，绝对路径
      callback(null, path.join(__dirname, './uploads'));
    },
    // 用于设置文件名
    filename: (req, file, callback) => {
      // 参数file是文件信息
      callback(null, sr(15) + file.originalname);
      // callback 的参数同上
      // sr():使用string-random进行随机文件名的生成
    }
  })
});

// 设置接口
let app = express();
// 设置时，需要在app.post()的参数2中设置 upload.single(),参数是上传文件的名字
// 在使用接口测试工具是，提交文件，要将upload.single()中的参数作为文件名输入
app.post('/FileUpload', upload.single('file'), (req, res) => {
  // req.file用雷查看上传后的文件信息
  console.log(req.file);
  res.send('ok');
});
app.listen(8080,() => {
  console.log('8080.......');
  
})
