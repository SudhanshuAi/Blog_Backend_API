const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sds@mysql'
  });
  
  // Connect to MySQL server
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL server:', err);
      return;
    }
    console.log('Connected to MySQL server');
  
    // Create database if it doesn't exist
    db.query('CREATE DATABASE IF NOT EXISTS blogpost', (err, result) => {
      if (err) {
        console.error('Error creating database:', err);
        return;
      }
      console.log('Database "blogpost" created or already exists');
  
      // Select the blogpost database
      db.query('USE blogpost', (err, result) => {
        if (err) {
          console.error('Error selecting database:', err);
          return;
        }
  
        // Create users table if it doesn't exist
        db.query(`CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL
        )`, (err, result) => {
          if (err) {
            console.error('Error creating users table:', err);
            return;
          }
          console.log('Table "users" created or already exists');
  
          // Create posts table if it doesn't exist
          db.query(`CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            userId INT,
            FOREIGN KEY (userId) REFERENCES users(id)
          )`, (err, result) => {
            if (err) {
              console.error('Error creating posts table:', err);
              return;
            }
            console.log('Table "posts" created or already exists');
          });
        });
      });
    });
  });

  module.exports = db;