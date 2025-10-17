import fs from 'fs';

const stream = fs.createReadStream('document.txt', 'utf8');

stream.on('data', chunk => {
    console.log('Number of chunk:', chunk.length);
    console.log('New chunk received:', chunk);
});

stream.on('error', err => {
    console.error('Error', err);
});

stream.on('end', () => {
    console.log('Finished');
});

setTimeout(() => {
    console.log('Timeout callback');
}, 5000);

Promise.resolve().then(() => console.log('Promise resolved'));

console.log('end');

