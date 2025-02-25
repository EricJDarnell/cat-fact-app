const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const db = require('./db');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 5000;
const SECRET_KEY = 'shhh';

app.use(cors());
app.use(bodyParser.json());

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
};

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
        `insert into users (id, username, password) values (?, ?, ?)`,
        [uuid.v4(), username, hashedPassword],
        function (err) {
            if (err) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const token = generateToken(this.lastID);
            res.status(201).json({ token });
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.get(`select * from users where username = ?`, [username], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' })
        }

        const token = generateToken(user.id);
        res.json({ token });
    });
});

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

app.get('/todos', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.all(`select * from todos where user_id = ?`, [userId], (err, todos) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(todos);
    });
});

app.get('/journal', authenticateToken, (req, res) => {
    const userId = req.user.id;
    db.all(`select * from journal_entries where user_id = ?`, [userId], (err, journal) => {});
});

app.post('/todos', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { task } = req.body;
    if(!task) {
        return res.status(400).json({ message: 'Task is required' });
    }

    db.run(`insert into todos (user_id, task) values (?, ?)`,
        [userId, task],
        function (err, todo) {
            if (err) {
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ id: this.lastID, task, completed: 0 });
        }
    );
});

app.post('/journal', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const { entry } = req.body;
    if(!entry) {
        return res.status(400).json({ message: 'Entry is required'});
    }

    db.run(`insert into journal_entries (user_id, entry) values (?, ?)`,
        [userId, entry],
        function (err) {
            if (err) {
                return res.status(500).json({ message: 'Database error'});
            }
            res.status(201).json({ id: this.lastID, entry });
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
