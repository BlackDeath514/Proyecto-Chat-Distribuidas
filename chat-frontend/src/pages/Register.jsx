import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

function Register() {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const register = async () => {

    if (!nombre || !email || !password) {

      setError(
        'Debe completar todos los campos'
      )

      return

    }

    try {

      setError('')
      setSuccess('')

      await api.post('/auth/register', {
        nombre,
        email,
        password
      })

      setSuccess(
        'Usuario registrado correctamente'
      )

      setTimeout(() => {
        navigate('/')
      }, 1500)

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Error al registrar usuario'
      )

    }

  }

  return (

    <div className="container mt-5">

      <div
        className="card mx-auto p-4"
        style={{
          maxWidth: '450px'
        }}
      >

        <h2 className="text-center mb-4">
          Registro
        </h2>

        {error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}

        {success && (

          <div className="alert alert-success">

            {success}

          </div>

        )}

        <input
          className="form-control mb-2"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) =>
            setNombre(e.target.value)
          }
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-success w-100"
          onClick={register}
        >
          Registrarse
        </button>

        <p className="mt-3 text-center">

          <Link to="/">
            Volver al login
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Register