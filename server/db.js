const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(` 
          create table if not exists users (
            id uuid primary key,
            username text unique not null,
            password text not null
          )
        `);
    db.run(`
          create table if not exists todos (
            id integer primary key autoincrement,
            user_id uuid not null,
            task text not null,
            completed integer default 0,
            foreign key (user_id) references users (id)
          )
        `);
    db.run(`
          create table if not exists journal_entries (
            id integer primary key autoincrement,
            user_id uuid not null,
            entry text not null,
            created_at datetime default current_timestamp,
            foreign key (user_id) references users (id)
          )
        `);
});

module.exports = db;