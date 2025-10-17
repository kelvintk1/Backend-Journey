#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('tasks.json');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

function writeTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2))
}

function readTasks(){
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data);
}

function generateId (tasks) {
    return tasks.length ?  tasks[tasks.length - 1].id + 1 : 1
}

const [,, command, ...args] = process.argv;

switch(command) {
    case 'add': {
        const description = args.join(' ');
        if (!description) {
            console.log('PLease provide a task description');
            break;
        }
        const tasks = readTasks();
        const newTask = {
            id: generateId(tasks),
            description,
            status: 'todo',
            createdAt: new Date().toISOString,
            updatedAt: new Date().toISOString,
        };
        tasks.push(newTask)
        writeTasks(tasks)
        console.log(`Task completed successfully (ID: ${newTask.id})`);
        break;
    }
    case 'update' : {
        const [id, ...newDesc] = args;
        const tasks = readTasks();
        const task = tasks.find(t => t.id === parseInt(id));
        if(!task) {
            console.log('Task not found');
            break;
        }
        task.description = newDesc.join(' ');
        task.updatedAt = new Date().toISOString;
        writeTasks(tasks);
        console.log('Task ${id} updated');
        break;
    }
    case 'delete' : {
        const [id] = args;
        let tasks = readTasks();
        const before = tasks.length;
        tasks = tasks.filter(t => t.id !== parseInt(id));
        writeTasks(tasks);
        if (tasks.length < before) {
            console.log(`Task ${id} deleted`);
        } else{
            console.log('Task not found');
            break;
        }
    }

    case 'mark-in-progress' :
    case 'mark-done' : {
        const [id] = args;
        const tasks = readTasks();
        const task = tasks.find(t => t.id === parseInt(id));
        if(!task) {
            console.log('Task not found')
            break;
        }
        task.status = command === 'mark-done' ? 'done' : 'in-progress';
        task.updateAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task ${id} marked as ${task.status}.`);
        break;
    }
    case 'list' : {
        const [filter] = args;
        const tasks = readTasks();
        let filtered = tasks;

        if (filter === 'done') {
            filtered = tasks.filter(t => t.status === 'done');
        } else if (filter === 'todo') {
            filtered = tasks.filter(t => t.status === 'todo')
        } else if (filter === 'in-progress') {
            filtered = tasks.filter(t => t.status === 'in-progress')
        }

        if(!filtered.length) {
            console.log('No task found');
        } else{
            filtered.forEach(t => {
                console.log(`[${t.id}] (${t.status}) ${t.description}`);
        });
        }
        break;
    }

    default:
        console.log(`Usage:
            task-cli add 'Task description'
            task-cli update <id> 'New description'
            task-cli delete <id>
            task-cli mark-in-progress <id>
            task-cli mark-done <id>
            task-cli list [done|todo|in-progress]
            `);
        
}