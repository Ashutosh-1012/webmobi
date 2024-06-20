// tests/auth.test.js
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Authentication System', () => {
    beforeAll(async () => {
        await User.sequelize.sync({ force: true });
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toBe('User registered successfully.');
    });

    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should protect the profile endpoint', async () => {
        const loginRes = await request(app)
            .post('/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        const token = loginRes.body.token;

        const profileRes = await request(app)
            .get('/profile')
            .set('Authorization', token);
        expect(profileRes.statusCode).toEqual(200);
        expect(profileRes.body).toHaveProperty('username', 'testuser');
        expect(profileRes.body).toHaveProperty('email', 'test@example.com');
    });
});
