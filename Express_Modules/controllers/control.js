let todos = [];

const getTodos = (req, res) => {
    try {
        return res.json(todos);
    } catch (error) {
        return res.status(400).json({message: 'Error retrieving todos'});
    }
};

const addTodo = (req, res) => {
    try {
        const {title, description} = req.body;
        const newTodo = {
            id:todos.length + 1,
            title,
            description
        };
        todos.push(newTodo);
        return res.status(201).json({message: 'Todo added successfully', todo: newTodo});
    } catch (error) {
        return res.status(400).json({message: 'Error adding todo'});
    }
};

// export default {getTodos, addTodo};

module.exports = {getTodos, addTodo};

