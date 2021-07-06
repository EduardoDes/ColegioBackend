const express = require('express');
require('dotenv').config();
const cors = require('cors');

const {dbConnection} = require('./database/config')

//Creacion de servidor
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo Body
app.use(express.json());

//Conexion a base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/directores', require('./routes/directorRoutes'));
app.use('/api/login', require('./routes/authRoutes'));
app.use('/api/profesores' , require('./routes/profesorRoutes'));
app.use('/api/apoderados', require('./routes/apoderadoRoutes'));
app.use('/api/cursos', require('./routes/cursoRoutes'));
app.use('/api/asignaturas', require('./routes/asignaturaRoutes'));
app.use('/api/anuncios', require('./routes/anuncioRoutes'));
app.use('/api/alumnos', require('./routes/alumnoRoutes'));
app.use('/api/profesoresAsignados', require('./routes/profesorAsignadoRoutes'));
app.use('/api/notas', require('./routes/notaRoutes'));
app.use('/api/asistencias' , require('./routes/asistenciaRoutes'));
app.use('/api/anotaciones', require('./routes/anotacionRoutes'));


app.listen(process.env.PORT, () => {
   console.log('Servidor corriendo en puerto', process.env.PORT);
})