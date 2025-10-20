// import Router from 'express';
// import {getTodos, addTodo} from '../controllers/control.js';

const { Router } = require('express');
const { getTodos, addTodo } = require('../controllers/control.js');

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', addTodo);

// export default router;
module.exports = router;