import request from 'supertest';
import app from '../../src/server';

//negative test cases

//positive test cases
describe('Get /api/users and test for the type', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
        }),
      ])
    );
  });
}
);