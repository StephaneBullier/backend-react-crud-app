const express = require('express');

require('./db/mongoose');

const carRouter = require('./router/car-router');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(carRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
