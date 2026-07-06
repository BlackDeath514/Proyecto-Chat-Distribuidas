const prisma = require('../config/prisma');

exports.getMessages = async (req, res) => {

  try {

    const mensajes = await prisma.mensaje.findMany({
      include: {
        usuario: true
      },
      orderBy: {
        fecha: 'asc'
      }
    });

    res.json(mensajes);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createMessage = async (req, res) => {

  try {

    const { contenido, usuarioId } = req.body;

    const mensaje = await prisma.mensaje.create({
      data: {
        contenido,
        usuarioId
      }
    });

    res.status(201).json(mensaje);

  } catch (error) {

    res.status(500).json(error);

  }

};