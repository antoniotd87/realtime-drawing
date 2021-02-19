const express = require('express');
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

// Evitar que heroku no bloquee el acceso a los sockets
const cors = require('cors')


const app = express();
const server = http.createServer(app)
const io = socketio(server)
require('./socket')(io)

// Modificacion del puerto
app.set('port', process.env.PORT || 5000)
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

server.listen(app.get('port'), () => console.log(`app en el puerto: ` + app.get('port')));
