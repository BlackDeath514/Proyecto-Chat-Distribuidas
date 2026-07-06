import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {

    const token = sessionStorage.getItem('token')

    if (token) {
      navigate('/chat')
    }

  }, [])

  const login = async () => {

    if (!email || !password) {

      setError(
        'Debe completar todos los campos'
      )

      return

    }

    try {

      setError('')

      const response = await api.post(
        '/auth/login',
        {
          email,
          password
        }
      )

      sessionStorage.setItem(
        'token',
        response.data.token
      )

      sessionStorage.setItem(
        'usuario',
        JSON.stringify(
          response.data.usuario
        )
      )

      navigate('/chat')

    } catch (error) {

      setError(
        error.response?.data?.message ||
        'Credenciales incorrectas'
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
          Login
        </h2>

        {error && (

          <div className="alert alert-danger">

            {error}

          </div>

        )}

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
          className="btn btn-primary w-100"
          onClick={login}
        >
          Ingresar
        </button>

        <p className="mt-3 text-center">

          ¿No tienes cuenta?{' '}

          <Link to="/register">
            Registrarse
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login