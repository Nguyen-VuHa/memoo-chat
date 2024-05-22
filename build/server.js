const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 4500;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} thêm WSS vào Websocket`);
});