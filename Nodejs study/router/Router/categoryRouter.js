const express = require('express');
let router = express.Router();
router.get('/get', (req, res) => {
  res.send('进行分类的信息获取1')
});
router.post('/post', (req, res) => {
  res.send('进行分类的信息新增2')
});
module.exports = router;