import { host } from '../../Helpers/config'
import { TokenError } from '../../customErrors'

export const createPregnancy = async ({ data, tag }) => {
  const res = await fetch(`${host}/pregnancy/${tag}`, {
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

export const updatePregnancy = async ({ data, tag, id }) => {
  const res = await fetch(`${host}/pregnancy/${tag}/${id}`, {
    method: 'PUT',
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

export const editPregnancy = async ({ data, tag, id }) => {
  const res = await fetch(`${host}/pregnancy/${tag}/${id}`, {
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
