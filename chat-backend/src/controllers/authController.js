const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {

    const { nombre, email, password } = req.body;

    const existe = await prisma.usuario.findUnique({
      where: { email }
    });

    if (existe) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHash
      }
    });

    res.status(201).json(usuario);

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const valido = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!valido) {
      return res.status(401).json({
        message: 'Contraseña incorrecta'
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    );

    res.json({
      token,
      usuario
    });

  } catch (error) {
    res.status(500).json(error);
  }
};