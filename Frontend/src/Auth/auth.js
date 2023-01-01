import { host } from '../Helpers/config'

const auth = async ({ username, password }) => {
  const res = await fetch(`${host}/login`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    const err = new Error('Invalid ID')
    err.code = res.status
    throw err
  }

  return res.json()
}

export default auth
