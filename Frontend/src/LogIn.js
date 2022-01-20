import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authentication } from './Helper'

const LogIn = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('password')
  const [password, setPassword] = useState('password')

  const formSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authentication(username, password)
      localStorage.setItem('token', data.token)
      navigate('/', { replace: true })
    } catch (err) {
      setLoading(false)
      alert(err)
      setUsername('')
      setPassword('')
    }
  }
  return loading ? (
    <>Loading</>
  ) : (
    <div>
      {}
      <div>
        <div>LOGIN</div>
        <form onSubmit={formSubmit}>
          <div>
            <label htmlFor="Username">
              Username
              <input
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="username"
              />
            </label>
            <label htmlFor="Password">
              Password
              <input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="password"
              />
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
