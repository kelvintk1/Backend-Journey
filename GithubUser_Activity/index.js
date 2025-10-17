#!/usr/bin/env node
import https from 'https';

const [,, username] = process.argv;

if(!username) {
    console.log('Please provide a Github username \nUsage:\nGithub-Activity <username>');
    process.exit(1);
}

const api = {
    hostname: `api.github.com`,
    path: `/users/${username}/events`,
    method: `Get`,
    headers: {
        'User-Agent': 'node.js'
    }
};

const req = https.request(api, res => {
    let data = "";

    res.on('data', chunk => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            console.log(`Failed to fetch activity \n(Status: ${res.statusCode})`);
            return;
        }
        try {
            const events = JSON.parse(data);

            if (!events.length) {
                console.log('No recent activity found');
                return;
            }

            events.slice(0, 10).forEach(event => {
                switch(event.type) {
                    case 'PushEvent':
                        console.log(`Pushed ${event.payload.commits.length} commits to ${event.repo.name}.`);
                        break;
                    case 'IssuesEvent':
                        console.log(`${event.payload.action} an issue in ${event.repo.name}`);
                        break;
                    case 'WatchEvent':
                        console.log(`Starred ${event.repo.name}`);
                        break;
                    case 'ForkEvent':
                        console.log(`Forked ${event.repo.name}`);
                        break;
                    default:
                        console.log(`${event.type} in ${event.repo.name}`);
                }
            });

        } catch (error) {
            console.error('Error parsing API response', error.message);
        }
    });
});

req.on('error', err => {
    console.error('Request failed', err.message)
});

req.end();