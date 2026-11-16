import { gzipSync } from 'node:zlib';
import request from 'supertest';
import app from '../src/server';

it('rejects trailing bytes after a gzip body and continues serving requests', async () => {
  // GHSA-27r3-jxmh-p828: a late decompressor error must not crash the process.
  const compressed = gzipSync('{}');
  const send = (body: Buffer) => request(app)
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .set('Content-Encoding', 'gzip')
    // Superagent otherwise JSON-serializes the Buffer instead of sending gzip bytes.
    .serialize((payload) => payload)
    .send(body);

  // There is no POST route: 404 proves the valid gzip body passed JSON parsing.
  expect((await send(compressed)).status).toBe(404);
  const response = await send(Buffer.concat([compressed, Buffer.from('invalid trailing bytes')]));
  expect(response.status).toBe(400);
  expect((await request(app).get('/api/users')).status).toBe(200);
});
