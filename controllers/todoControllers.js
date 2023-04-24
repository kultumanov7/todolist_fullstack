const { Todo } = require('../models/todoModel');

const allowedStatusValues = ["todo", "done", "trash"];

const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.json(todo);
    } catch(err) {
        res.status(500).send("Cannot get todo");
    }
}

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch(err) {
        res.status(500).send("Cannot get todos");
    }
}

const postTodo = async (req, res) => {
    const todo = new Todo({
        name: req.body.name,
        status: "todo"
    });
    try {
        await todo.save();
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch(err) {
        res.status(400).send("Cannot post todo");
    }
}

const updateTodo = async (req, res) => {
    try {
        if (!allowedStatusValues.includes(req.body.status.toLowerCase())) {
            return res.status(400).send("Invalid status value");
        }
        const todo = await Todo.findByIdAndUpdate(req.params.id, { status: req.body.status.toLowerCase()})
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch(err) {
        res.status(400).send("Cannot update todo");
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        const allTodos = await Todo.find();
        res.status(200).json(allTodos);
    } catch(err) {
        res.status(400).send("Cannot delete todo");
    }
}

const getTodosByStatus = async (req, res) => {
    try {
        if (!allowedStatusValues.includes(req.params.status.toLowerCase())) {
            return res.status(400).send("Invalid status value");
        }
        const todos = await Todo.find({ status: req.params.status.toLowerCase() });
        res.json(todos);
    } catch(err) {
        res.status(500).send("Cannot get todos");
    }
}

module.exports = {
    deleteTodo,
    getTodo,
    getTodos,
    getTodosByStatus,
    postTodo,
    updateTodo,
}
