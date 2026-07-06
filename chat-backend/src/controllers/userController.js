const prisma = require('../config/prisma');

exports.getUsers = async (req, res) => {

  try {

    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true
      }
    });

    res.json(usuarios);

  } catch (error) {
    res.status(500).json(error);
  }
};