import express from 'express';

const PORT = 3000;

express()
  .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));