const express = require("express");
const app = express();
const router = express.Router();

const TodoRouter = require('./todo');

router.use('/todo', TodoRouter);

module.exports = router;