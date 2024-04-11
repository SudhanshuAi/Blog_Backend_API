const express = require('express');
const jwt = require('jsonwebtoken');


const AuthRouter = require('./routes/Authn');
const BlogRouter = require('./routes/blog');
const app = express();

app.use('/api/v1',AuthRouter);

app.use('/api/v1/posts',BlogRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports = app;