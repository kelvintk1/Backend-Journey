import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Welcome to the Fetch Data API!');
});

app.get('/data', async (req, res) => {
    try {
        const http = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!http.ok) {
            throw new Error(`HTTP error! status: ${http.status}`);
        }
        const data = await http.json();
        if (!Array.isArray(data) || data.length === 0) {
            return res.status(502).json({message: 'Invalid data received'})
        };

        res.status(200).json({message: 'Data fetched successfully', data});
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});