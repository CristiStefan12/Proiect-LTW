import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { REGISTER_USER, LOGIN_USER } from './graphql/queries'
import { useNavigate } from 'react-router-dom'

interface LoginData {
  loginUser: {
    token: string
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

interface LoginVars {
  email: string
  password: string
}

interface RegisterData {
  registerUser: {
    id: string
    name: string
    email: string
    role: string
  }
}

interface RegisterVars {
  name: string
  email: string
  password: string
  role: string
}

function AuthPage() {
  const [isRegister, setIsRegister] = useState(true)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')

  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const [registerUser, { loading: regLoading, error: regError }] =
    useMutation<RegisterData, RegisterVars>(REGISTER_USER)

  const [loginUser, { loading: loginLoading, error: loginError }] =
    useMutation<LoginData, LoginVars>(LOGIN_USER)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess('')

    if (isRegister) {
      const res = await registerUser({
        variables: { name, email, password, role },
      })

      if (res.data) {
        navigate('/home')
      }
    } else {
      const res = await loginUser({
        variables: { email, password },
      })

      if (res.data) {
        localStorage.setItem('token', res.data.loginUser.token)
        navigate('/home')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          {isRegister ? 'Înregistrare' : 'Autentificare'}
        </h2>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setIsRegister(true)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              isRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Register
          </button>
          <button
            onClick={() => setIsRegister(false)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              !isRegister ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Login
          </button>
        </div>

        {success && <p className="text-green-600 text-center mb-3">{success}</p>}
        {regError && isRegister && (
          <p className="text-red-600 text-center mb-3">{regError.message}</p>
        )}
        {loginError && !isRegister && (
          <p className="text-red-600 text-center mb-3">{loginError.message}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <input
              className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Nume"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          )}

          <input
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            className="border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
            type="password"
            placeholder="Parolă"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <select
              className="border p-2 rounded"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="STUDENT">Student</option>
              <option value="PROFESSOR">Profesor</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}

          <button
            type="submit"
            disabled={regLoading || loginLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700 transition"
          >
            {isRegister
              ? regLoading
                ? 'Se creează...'
                : 'Înregistrare'
              : loginLoading
              ? 'Se autentifică...'
              : 'Autentificare'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
