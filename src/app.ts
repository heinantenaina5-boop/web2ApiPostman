
const express = require('express');
const etudiantRoutes = require('./routes/etudiant.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Etudiants - OK', docs: '/etudiants' });
});

app.use('/etudiants', etudiantRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
