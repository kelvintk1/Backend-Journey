import express from 'express';
import todos from './data.js';

const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
    res.send("Welcome to the Todo API!");
})

app.get('/todos', (req, res) => {
    try {
        if(todos.length === 0) {
            return res.send('There are no todos available');
        } else {
            return res.json(todos);
        }
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.post('/todos', (req, res) => {
    try {
        const {title, description} = req.body;
        const newTodo = {
            id: todos.length + 1,
            title,
            description
        };
        todos.push(newTodo);
        res.status(201).json({message: "Todo added successfully", todo: newTodo});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    const todo = todos.find(t => t.id === Number(id));
    if(!todo) {
        return res.status(404).json({message: 'Todo not found'});
    } else {
    res.json(todo);
    }
});

app.put('/todos/:id', (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const todo = todos.find(t => t.id === Number(id));

    if(!todo)
        return res.status(404).json({message: 'Todo not found'});

    todo.title = title || todo.title;
    todo.description = description || todo.description;

    res.json({message: 'Todo updated successfully', todo});
})

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const idNum = Number(id);
    const todo = todos.find(t => t.id === idNum);
    const exist = todos.some(t => t.id === idNum);
    if (!exist)
      return res.status(404).json({ message: 'Todo not found' });

    todos.splice(0, todos.length, 
      ...todos
        .filter(t => t.id !== idNum)
        .map((t, index) => ({ ...t, id: index + 1 }))
    );
    
    res.status(202).json({message: `Todo ${idNum} deleted successfully`, todo});
});