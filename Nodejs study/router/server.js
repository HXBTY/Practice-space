const express = require('express');
const categoryRouter = require('./Router/categoryRouter');
const userRouter = require('./Router/userRouter');
let app = express();
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.listen(8080, () => {
  console.log('8080.....');
  
})