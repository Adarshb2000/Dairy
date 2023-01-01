import { host } from '../../Helpers/config'
import { TokenError } from '../../customErrors'

export const milkEdit = async ({ tag, data, id }) => {
  const res = await fetch(`${host}/milk/${tag}/${id}`, {
    method: 'PATCH',
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

export const deleteMilk = async ({ tag, id }) => {
  const res = await fetch(`${host}/milk/${tag}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  if (!res.ok) {
    if (res.status === 401 || res.status === 408) {
      throw new TokenError((await res.json()).message)
    }
  }
  return res.json()
}
