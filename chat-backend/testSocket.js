const { io } = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {

  console.log('Conectado');

  socket.emit('join', {
    nombre: 'Cristopher'
  });

});

socket.on('notification', (data) => {
  console.log(data);
});

socket.on('users_online', (data) => {
  console.log(data);
});

socket.on('message', (data) => {
  console.log(data);
});