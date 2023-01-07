import { host } from '../Helpers/config'
import { TokenError } from '../customErrors'

export const create = async ({ data, tag }) => {
  const res = await fetch(`${host}/animal/${tag}/comment`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new TokenError('Expired')
    }
    throw new Error((await res.json()).message)
  }

  return res.json()
}

export const edit = async ({ data, tag, id }) => {
  const res = await fetch(`${host}/animal/${tag}/comment/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new TokenError('Expired')
    }
    throw new Error((await res.json()).message)
  }

  return res.json()
}

export const deleteComment = async ({ tag, id }) => {
  const res = await fetch(`${host}/animal/${tag}/comment/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new TokenError('Expired')
    }
    throw new Error((await res.json()).message)
  }

  return res.json()
}
