import('chai').then(chai => {
    const chaiHttp = chai.default;
    const { assert } = chai;
    const mysql = require('mysql2/promise');
    const app = require('./index.js');
  
    chai.use(chaiHttp);
  
    // Test database connection settings
    const testDBConfig = {
        host: 'localhost',
        user: 'root',
        password: 'Sds@mysql',
        database: 'test_blogpost',
    };
  
    async function setupTestDatabase() {
        try {
            // Connect to MySQL server and specify the database name in the connection configuration
            const connection = await mysql.createConnection({
                host: testDBConfig.host,
                user: testDBConfig.user,
                password: testDBConfig.password,
                database: testDBConfig.database,
            });
  
            // Create the test database if it does not exist
            await connection.query(`CREATE DATABASE IF NOT EXISTS ${testDBConfig.database}`);
  
            console.log('Test database created successfully');
  
            // Create user table if not exists
            await connection.execute(`CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )`);
  
            // Create post table if not exists
            await connection.execute(`CREATE TABLE IF NOT EXISTS posts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                userId INT,
                FOREIGN KEY (userId) REFERENCES users(id)
            )`);
  
            console.log('Test database, user table, and post table created successfully');
  
            // Close the database connection
            await connection.end();
        } catch (error) {
            console.error('Error setting up test database:', error);
        }
    }
  
    // Call the function to create the test database, user table, and post table
    setupTestDatabase().then(() => {
        // Test user signup endpoint
        it('Should signup a user', async function() {
            const userData = { email: 'test@example.com', password: 'password123' };
            const res = await chai.request(app).post('/api/v1/signup').send(userData);
            assert.equal(res.status, 200);
            assert.property(res.body, 'token');
        });
  
        // Test user signin endpoint
        it('Should signin a user', async function() {
            const userData = { email: 'test@example.com', password: 'password123' };
            const res = await chai.request(app).post('/api/v1/signin').send(userData);
            assert.equal(res.status, 200);
            assert.property(res.body, 'token');
        });
  
        // Test creating a post
        it('Should create a post', function(done) {
            const postData = { title: 'Test Post', description: 'This is a test post.' };
            chai.request(app)
                .post('/api/v1/posts')
                .set('Authorization', 'Bearer ' + userToken)
                .send(postData)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.message, 'Post created successfully');
                    done();
                });
        });
  
        // Test reading a specific post
        it('Should read a specific post', function(done) {
            chai.request(app)
                .get('/api/v1/posts/1') // Assuming there's a post with ID 1
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.property(res.body, 'post');
                    done();
                });
        });
  
        // Test updating a post
        it('Should update a post', function(done) {
            const updatedData = { title: 'Updated Post', description: 'This post has been updated.' };
            chai.request(app)
                .put('/api/v1/posts/1') // Assuming there's a post with ID 1
                .set('Authorization', 'Bearer ' + userToken)
                .send(updatedData)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.message, 'Post updated successfully');
                    done();
                });
        });
  
        // Test deleting a post
        it('Should delete a post', function(done) {
            chai.request(app)
                .delete('/api/v1/posts/1') // Assuming there's a post with ID 1
                .set('Authorization', 'Bearer ' + userToken)
                .end(function(err, res) {
                    if (err) return done(err);
                    assert.equal(res.body.message, 'Post deleted successfully');
                    done();
                });
        });
    });
  });
  