const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.wasm': 'application/wasm',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalizar a URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Obter a extensão do arquivo
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeType = mimeTypes[extname] || 'application/octet-stream';

  // Ler o arquivo
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Arquivo não encontrado
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Arquivo não encontrado</h1>', 'utf-8');
      } else {
        // Erro do servidor
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 - Erro interno do servidor</h1>', 'utf-8');
      }
    } else {
      // Sucesso
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📁 Servindo arquivos do diretório: ${__dirname}`);
  console.log(`🌐 Abra seu navegador e acesse: http://localhost:${PORT}`);
});
