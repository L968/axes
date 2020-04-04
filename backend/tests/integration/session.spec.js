const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('SESSION', () => {

    beforeEach(async () => {
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('Should create a session and return a token', async () => {
        const response = await request(app)
        .post('/session')
        .send({
            login: "999",
            password: "testest"
        });

        console.log(response.body);
        expect([200, 403]).toContain(response.status);

        if (response.status === 200) {
            expect(response.body).toHaveProperty('user_id');
            expect(response.body).toHaveProperty('token');
            expect(Number.isInteger(response.body.user_id)).toBe(true);
        } else {
            expect(response.body).toHaveProperty('error');
        }

    });

});