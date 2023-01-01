import { host } from '../../Helpers/config'
import { TokenError } from '../../customErrors'

export const editForm = async ({ data, id, tag }) => {
  const res = await fetch(`${host}/disease/${tag}/vaccine/${id}`, {
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

export const deleteForm = async ({ id, tag }) => {
  const res = await fetch(`${host}/disease/${tag}/vaccine/${id}`, {
    credentials: 'include',
    method: 'DELETE',
  })

  if (!res.ok) {
    if (res.status === 401 || res.status === 408) {
      throw new TokenError((await res.json()).message)
    }
  }
  return res.json()
}
