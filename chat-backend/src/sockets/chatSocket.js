const prisma = require('../config/prisma');

const usuariosConectados = [];

module.exports = (io) => {

  io.on('connection', (socket) => {

    console.log('Usuario conectado:', socket.id);

    socket.on('join', (usuario) => {

      const usuarioExiste = usuariosConectados.find(
        u => u.nombre === usuario.nombre
      );

      if (!usuarioExiste) {

        usuariosConectados.push({
          socketId: socket.id,
          nombre: usuario.nombre
        });

      }

      io.emit('users_online', usuariosConectados);

      console.log('Usuarios conectados:');
      console.table(usuariosConectados);

      io.emit('notification', {
        mensaje: `${usuario.nombre} se conectó`
      });

    });

    socket.on('message', async (data) => {

      try {

        const mensaje = await prisma.mensaje.create({
          data: {
            contenido: data.contenido,
            usuarioId: data.usuarioId
          }
        });

        io.emit('message', {
          id: mensaje.id,
          contenido: mensaje.contenido,
          fecha: mensaje.fecha,
          usuario: data.nombre
        });

      } catch (error) {

        console.error(error);

      }

    });

    socket.on('disconnect', () => {

      const index = usuariosConectados.findIndex(
        u => u.socketId === socket.id
      );

      if (index !== -1) {

        const usuario = usuariosConectados[index];

        usuariosConectados.splice(index, 1);

        io.emit('notification', {
          mensaje: `${usuario.nombre} se desconectó`
        });

      }

      io.emit('users_online', usuariosConectados);

      console.log('Usuarios conectados después de desconectar:');
      console.table(usuariosConectados);

      console.log('Usuario desconectado');

    });

  });

};