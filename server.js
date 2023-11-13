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

// Endpoint para registrar un usuario
app.post('/registrarUsuario', (req, res) => {
  const { nombre, apellido, edad, username, password, rol } = req.body;
  const query = 'INSERT INTO usuarios (nombre, apellido, edad, username, password, rol) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [nombre, apellido, edad, username, password, rol], (error, results) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ message: 'Error al registrar el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    }
  });
});

// Endpoint para iniciar sesión
app.post('/iniciarSesion', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    } else {
      if (results.length > 0) {
        const usuario = results[0];
        res.status(200).json({ message: 'Inicio de sesión exitoso', usuario });
      } else {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
});
