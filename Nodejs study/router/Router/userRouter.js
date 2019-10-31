const express = require('express');
const tool = require('../utils/tool.js');
// 调用Router()创建一个路由管理器的实例
let router = express.Router();
// router的只用与app的用法相同
router.get('/get', tool.userGet);
router.post('/post', (req, res) => {
  res.send('进行分类的信息新增3');
});
// 将router导出
module.exports = router;