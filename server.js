const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'aaron',
  database: 'mi_base_de_datos',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos exitosa');
});

app.post('/agregarPersona', (req, res) => {
  const { nombre, apellido, edad } = req.body;
  const query = 'INSERT INTO personas (nombre, apellido, edad) VALUES (?, ?, ?)';
  connection.query(query, [nombre, apellido, edad], (error, results) => {
    if (error) {
      console.error('Error al insertar la persona:', error);
      res.status(500).json({ message: 'Error al insertar la persona' });
    } else {
      res.status(201).json({ message: 'Persona insertada con éxito' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
