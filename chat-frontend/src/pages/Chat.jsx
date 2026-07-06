import { useEffect, useState } from 'react'
import api from '../services/api'
import { io } from 'socket.io-client'



const socket = io(
  'https://proyecto-chat-distribuidas.onrender.com'
)

function Chat() {

  const usuario = JSON.parse(
    sessionStorage.getItem('usuario')
  )

  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [usuariosOnline, setUsuariosOnline] = useState([])

  useEffect(() => {

    const cargarMensajes = async () => {

      try {

        const response = await api.get('/messages')

        setMensajes(response.data)

      } catch (error) {

        console.error(error)

      }

    }

    cargarMensajes()

    socket.emit('join', {
      nombre: usuario.nombre
    })

    socket.on('message', (data) => {

      setMensajes((prev) => [
        ...prev,
        data
      ])

    })

    socket.on('users_online', (data) => {

      setUsuariosOnline(data)

    })

    return () => {

      socket.off('message')
      socket.off('users_online')

    }

  }, [])

  const enviarMensaje = () => {

    if (!mensaje.trim()) return

    socket.emit('message', {
      contenido: mensaje,
      usuarioId: usuario.id,
      nombre: usuario.nombre
    })

    setMensaje('')
  }
  const cerrarSesion = () => {

  sessionStorage.removeItem('token')
  sessionStorage.removeItem('usuario')

  window.location.href = '/'

}

  return (

  <div className="container mt-4">

    <div className="d-flex justify-content-between align-items-center mb-3">

      <div>

        <h2>Chat Distribuido</h2>

        <h5>
          Bienvenido {usuario.nombre}
        </h5>

      </div>

      <button
        className="btn btn-danger"
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>

    </div>

    <div className="row mt-4">

      {/* Usuarios conectados */}

      <div className="col-md-3">

        <div className="card">

          <div className="card-header">
            Usuarios conectados
          </div>

          <ul className="list-group list-group-flush">

            {usuariosOnline.map((user, index) => (

              <li
                key={index}
                className="list-group-item"
              >
                🟢 {user.nombre}
              </li>

            ))}

          </ul>

        </div>

      </div>

      {/* Chat */}

      <div className="col-md-9">

        <div
          className="border rounded p-3 mb-3"
          style={{
            height: '450px',
            overflowY: 'auto'
          }}
        >

          {mensajes.map((msg, index) => {

            const nombreMensaje =
              msg.usuario?.nombre || msg.usuario

            const esMio =
              nombreMensaje === usuario.nombre

            return (

              <div
                key={index}
                className={`d-flex mb-2 ${
                  esMio
                    ? 'justify-content-end'
                    : 'justify-content-start'
                }`}
              >

                <div
                  className={`p-2 rounded ${
                    esMio
                      ? 'bg-primary text-white'
                      : 'bg-light'
                  }`}
                  style={{
                    maxWidth: '70%'
                  }}
                >

                  <strong>
                    {nombreMensaje}
                  </strong>

                  <br />

                  {msg.contenido}

                  <br />

                  <small>
                    {msg.fecha
                      ? new Date(
                          msg.fecha
                        ).toLocaleTimeString()
                      : ''}
                  </small>

                </div>

              </div>

            )

          })}

        </div>

        <div className="d-flex gap-2">

          <input
            className="form-control"
            value={mensaje}
            onChange={(e) =>
              setMensaje(e.target.value)
            }
            placeholder="Escribe un mensaje..."
          />

          <button
            className="btn btn-primary"
            onClick={enviarMensaje}
          >
            Enviar
          </button>

        </div>

      </div>

    </div>

  </div>

)

}

export default Chat