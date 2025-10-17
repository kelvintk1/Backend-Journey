import express from 'express';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Dummy data
let users = [
    {id: 1, name: 'Kay', age: 21, language: 'Python'},
    {id: 2, name: 'Kelly', age: 22, language: 'C++'},
    {id: 3, name: 'Kelvin', age: 23, language: 'JavaScript'},
    {id: 4, name: 'Mega', age: 24, language: 'Php'},
    {id: 5, name: 'AB', age: 20, language: 'Ruby'}
]

// get all users
app.get('/users', (req, res) => {
    res.json(users);
})

// get a single user by id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === Number(req.params.id))
    if(!user) {
        return res.status(404).json({message:'User not found'})
    }
    res.json(user);
})

// Add a new user
app.post('/users', (req, res) => {
    const {name, age} = req.body;
    const newUser = {id: users.length + 1, name, age};
    users.push(newUser)
    res.status(201).json(newUser)
});

// Update user
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const {name, age} = req.body
    const user = users.find(u => u.id === Number(id))

    if(!user)
        return res.status(404).json({message: 'User not found'})

    user.name = name || user.name;
    user.age = age || user.age;

    res.json(user);
});

// delete user
app.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    const idNum = Number(id);

    const exists = users.some(u => u.id === idNum);
    if(!exists){
        return res.status(404).json({message: 'User not found'})
    }

    users = users
        .filter(u => u.id !== idNum)
        .map((u, index) => ({...u, id: index + 1}))

    res.json({message: `User ${idNum} deleted successfully`})
});