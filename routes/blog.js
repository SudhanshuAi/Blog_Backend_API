const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('../db');

const router = express.Router();

const authenticateToken = require('../middleware');


// Use body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Posts endpoints

// Create posts
router.post('/', authenticateToken, async (req, res) => {
    try {
      const { title, description } = req.body;
      const userEmail = req.user.email; // Assuming user email is unique
  
      // Retrieve user ID based on email
      const userIdQuery = 'SELECT id FROM users WHERE email = ?';
      db.query(userIdQuery, [userEmail], async (userIdErr, userIdResults) => {
        if (userIdErr || userIdResults.length === 0) {
          console.error('Error fetching user ID:', userIdErr);
          return res.status(500).json({ error: 'Error fetching user ID' });
        }
        
        const userId = userIdResults[0].id;
  
        // Insert task with the retrieved user ID
        const sql = 'INSERT INTO posts (title, description, userId) VALUES (?, ?, ?)';
        await db.query(sql, [title, description, userId]);
  
        console.log('Post created successfully');
        res.json({ message: 'Post created successfully' });
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  });
  

// Read a specific post
router.get('/:id', async (req, res) => {
    try {
      const postId = req.params.id;
  
      // Query to retrieve the task based on its ID
      const sql = 'SELECT * FROM posts WHERE id = ?';
      db.query(sql, [postId], (err, results) => {
        if (err) {
          console.error('Error fetching post:', err);
          return res.status(500).json({ error: 'Error fetching post' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        const post = results[0];
        res.json({ post });
      });
    } catch (error) {
      console.error('Error reading post:', error);
      res.status(500).json({ error: 'Error reading post' });
    }
  });
  

// Update post
router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const postId = req.params.id; // Extract post ID from request parameters
      const { title, description } = req.body;
      const userEmail = req.user.email; // Assuming user email is unique
  
      // Retrieve user ID based on email
      const userIdQuery = 'SELECT id FROM users WHERE email = ?';
      db.query(userIdQuery, [userEmail], async (userIdErr, userIdResults) => {
        if (userIdErr || userIdResults.length === 0) {
          console.error('Error fetching user ID:', userIdErr);
          return res.status(500).json({ error: 'Error fetching user ID' });
        }
  
        const userId = userIdResults[0].id;
  
        // Update task with the retrieved user ID and task ID
        const updatePostSql = 'UPDATE posts SET title = ?, description = ? WHERE id = ? AND userId = ?';
        await db.query(updatePostSql, [title, description, postId, userId]);
  
        console.log('Post updated successfully');
        res.json({ message: 'Post updated successfully' });
      });
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Error updating post' });
    }
  });
    
  

// Delete post
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      const postId = req.params.id;
      const userEmail = req.user.email; // Assuming user email is unique
  
      // Retrieve user ID based on email
      const userIdQuery = 'SELECT id FROM users WHERE email = ?';
      db.query(userIdQuery, [userEmail], async (userIdErr, userIdResults) => {
        if (userIdErr || userIdResults.length === 0) {
          console.error('Error fetching user ID:', userIdErr);
          return res.status(500).json({ error: 'Error fetching user ID' });
        }
  
        const userId = userIdResults[0].id;
  
        // Delete task with the retrieved user ID
        const sql = 'DELETE FROM posts WHERE id = ? AND userId = ?';
        await db.query(sql, [postId, userId]);
  
        console.log('Post deleted successfully');
        res.json({ message: 'Post deleted successfully' });
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  });

  module.exports = router;