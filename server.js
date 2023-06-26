const { readdirSync } = require('fs');
const express = require('express');
const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());


readdirSync('./routes').map(File => app.use('/api/V1', require(`./routes/${File}`)));


mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`server listening on : ${port}`);
    })
  })
  .catch(err => console.log(err));
