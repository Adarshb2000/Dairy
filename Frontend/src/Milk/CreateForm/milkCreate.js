import { host } from '../../Helpers/config'
import { TokenError } from '../../customErrors'

const milkCreate = async ({ tag, data }) => {
  const res = await fetch(`${host}/milk/${tag}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    if (res.status === 401 || res.status === 408) {
      throw new TokenError((await res.json()).message)
    }
  }
  return res.json()
}

export default milkCreate
