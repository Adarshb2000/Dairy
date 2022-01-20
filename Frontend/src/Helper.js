import { api, host } from './config'
import { DataBaseError, TokenError } from './CustomErrors'

const logout = (navigate) => {
  localStorage.clear()
  navigate('/login')
}

const authentication = async (username, password) => {
  const data = { username: username, password: password }
  const res = await fetch(`${host}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (res.ok) {
    const response = await res.json()
    return response
  } else {
    throw new Error('invalid username or pass')
  }
}

const logDetails = async (event, subRoute, obj = {}) => {
  event.preventDefault()
  const token = localStorage.getItem('token')
  const body = Object.assign(
    Object.fromEntries(
      Array.from(event.target.getElementsByTagName('input')).map((element) => {
        switch (element.type) {
          case 'number':
            return [element.name, parseFloat(element.value)]
          case 'date':
            return [element.name, new Date(element.value)]
          default:
            return [element.name, element.value]
        }
      })
    ),
    obj
  )
  const res = await fetch(api + subRoute, {
    method: 'POST',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    const ret = await res.json()
    return ret
  } else {
    if ([408, 403, 400].includes(res.status)) {
      throw new TokenError(res.statusText)
    } else if (res.status === 500) {
      throw new Error('Contact the maker')
    } else {
      throw new DataBaseError(res.statusText)
    }
  }
}

export { authentication, logout, logDetails }
