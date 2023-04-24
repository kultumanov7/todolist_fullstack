const { 
    deleteTodo,
    getTodo, 
    getTodos,
    getTodosByStatus,
    postTodo, 
    updateTodo 
} = require('../controllers/todoControllers');

const router = require('express').Router();

router.route('/todos')
    .get(getTodos)
    .post(postTodo);
   
router.route('/todos/:id')
    .get(getTodo)
    .patch(updateTodo)
    .delete(deleteTodo);

router.route('/todos/filter/:status')
    .get(getTodosByStatus);

module.exports = router;