import { gzipSync } from 'node:zlib';
import request from 'supertest';
import app from '../src/server';

it('rejects trailing bytes after a gzip body and continues serving requests', async () => {
  // GHSA-27r3-jxmh-p828: a late decompressor error must not crash the process.
  const body = Buffer.concat([gzipSync('{}'), Buffer.from('invalid trailing bytes')]);
  const response = await request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .set('Content-Encoding', 'gzip')
    .send(body);

  expect(response.status).toBe(400);
  expect((await request(app).get('/api/users')).status).toBe(200);
});
