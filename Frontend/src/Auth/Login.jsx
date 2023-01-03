import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import auth from './auth'

const LogIn = () => {
  const navigate = useNavigate()

  const result = useMutation(auth, {
    onSuccess: () => {
      navigate('/')
    },
    onError: (err) => {
      if (err.code === 401) {
        alert('Invalid username and/or password')
      }
    },
  })

  const formSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    result.mutate(Object.fromEntries(formData.entries()))
  }
  return result.isLoading ? (
    <div className="wrapper">
      <span className="loader">Loading...</span>
    </div>
  ) : (
    <div className="wrapper extra-short">
      <form className="login-container" onSubmit={formSubmit}>
        <div className="heading0">LOGIN</div>
        <div>
          <label htmlFor="Username">
            <span className="font-semibold">Username</span>
            <input
              className="inputs w-3/5 min-w-[100px] max-w-[250px]"
              autoCapitalize="none"
              placeholder="username"
              name="username"
              autoFocus={true}
              required={true}
              defaultValue={import.meta.env.username || ''}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Password">
            <span className="font-semibold">Password</span>
            <input
              className="inputs w-3/5 min-w-[100px] max-w-[250px]"
              id="password"
              type="password"
              name="password"
              required={true}
              placeholder="password"
              defaultValue={import.meta.env.password || ''}
            />
          </label>
        </div>
        <div>
          <button className="buttons">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn
