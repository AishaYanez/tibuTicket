const http = require('http');

async function fetchlists() {
    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/api/v1/lists',
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (result) => {
            let str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str)));
        });

        req.end();
    });
}

async function fetchusers() {
    const options = {
        hostname: 'localhost',
        port: 4000,
        path: '/api/v1/users/users',
        method: 'GET',
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, (result) => {
            let str = '';
            result.on('data', (b) => str += b);
            result.on('error', reject);
            result.on('end', () => resolve(JSON.parse(str)));
        });

        req.end();
    });
}

async function beforeRender(req, res) {
    try {
        req.data.lists = await fetchlists();
        console.log(req.data.lists);
    } catch (error) {
        console.error('Error fetching lists:', error);
    }

    try {
        req.data.users = await fetchusers();
        console.log(req.data.users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
