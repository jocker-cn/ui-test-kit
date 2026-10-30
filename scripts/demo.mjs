import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../examples/chat.html', import.meta.url));
createServer((request, response) => {
  if (request.url !== '/' && request.url !== '/favicon.ico') {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(html);
}).listen(4173, '127.0.0.1', () => {
  console.log('Local simulated chat fixture: http://127.0.0.1:4173 (Ctrl+C to stop)');
});
