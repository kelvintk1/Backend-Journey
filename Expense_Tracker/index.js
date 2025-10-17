#!/usr/bin/env node
import fs, { existsSync } from 'fs';
import path from 'path';

const filePath = path.resolve('expenses.json');

if(!existsSync(filePath)){
    fs.writeFileSync(filePath, JSON.stringify([]))
}

function writeExpense(expense) {
    fs.writeFileSync(filePath, JSON.stringify(expense, null, 2));
}

function readExpense() {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};

const generateId = (expense) => {
    return expense.length ? expense[expense.length - 1].id + 1:1;
}

const [,, command, ...args] = process.argv;

switch (command) {
    case 'add': {
           const [description, amount] = args.join(' ').split(',');
           if(!description || !amount) {
            console.log('Please provide the expense description and amount');
                break;
           }

           const expenses = readExpense();
           const newExpense =  {
            id: generateId(expenses),
            description,
            amount,
            date: new Date().toISOString,
            createdAt: new Date().toISOString,
            updatedAt: new Date().toISOString
           }
           expenses.push(newExpense);
           writeExpense(expenses);
           console.log(`ID:${newExpense.id}\nExpense successfully added`);
           break;
    }
}