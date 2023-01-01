import { host } from '../Helpers/config'
import { DataBaseError, TokenError } from '../customErrors'

export const getTagDetails = async ({ queryKey }) => {
  const tag = queryKey[1]
  const res = await fetch(`${host}/animal/${tag}`, {
    credentials: 'include',
  })
  if (!res.ok) {
    if (res.status === 401 || res.status === 408) {
      throw new TokenError((await res.json()).message)
    } else if (res.status === 404) {
      throw new DataBaseError((await res.json()).message)
    }
  }
  return res.json()
}

export const setTagDetails = async (data) => {
  const res = await fetch(`${host}/animal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    if (res.status === 401) {
    }
  }
  if (!res.ok) {
    if (res.status === 401 || res.status === 408) {
      throw new TokenError((await res.json()).message)
    }
  }
  return res.json()
}

export const editTagDetails = async ({ data, tag }) => {
  const res = await fetch(`${host}/animal/${tag}`, {
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
