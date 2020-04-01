const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('USER', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should create a user', async () => {
        const response = await request(app)
        .post('/user')
        .send({
            name: "Lucas",
            id_number: 999,
            login: "999",
            password: "testest",
            email: "test@test.com",
            department_id: 9
        });

        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user_id');
        expect(Number.isInteger(response.body.user_id)).toBe(true);
    });

});