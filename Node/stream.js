import fs from 'fs';

const wordToCount = "Push";
let count = 0;

const stream = fs.createReadStream('Text.txt', {encoding: 'utf8'});

stream.on('data', chunk => {
    console.log('Number of chunk:', chunk.length);
    console.log('New chunk received:', chunk);

    const matches = chunk.match(new RegExp(wordToCount, 'g'));
    if(matches) {
        count += matches.length;
    }
    setTimeout(() => {
        console.log(`Count of "${wordToCount}" so far:`, count);
    }, 2000);
});

stream.on('error', err => {
    console.error('Error', err);
});

stream.on('end', () => {
    console.log('Finished');
});
