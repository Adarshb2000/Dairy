import { api, host } from './config'
import { DataBaseError, TokenError } from './CustomErrors'

const logout = (navigate) => {
  localStorage.clear()
  navigate('/login', { replace: true })
}

const deleteTag = async (animal, tag) => {
  const ret = await fetch(`${api}/delete/${animal}/${tag}`, {
    method: 'DELETE',
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  })
  if (ret.ok) {
    return true
  } else {
    throw new Error('Could not delete tag')
  }
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

const objectForSubmission = (form, obj = {}) => {
  return Object.assign(
    Object.fromEntries(
      Array.from(form.getElementsByTagName('input')).map((element) => {
        if (element.required) {
          if (element.value === '' || element.value === '0')
            throw new Error(`${element.name} required`)
        }
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
}

const logDetails = async (subRoute, body) => {
  const token = localStorage.getItem('token')
  const res = await fetch(api + subRoute, {
    method: 'POST',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const ret = await res.json()
  if (res.ok) {
    return ret
  } else {
    if (res.status === 409) {
      throw new DataBaseError(ret.message)
    } else if ([408, 403, 400].includes(res.status)) {
      throw new TokenError(res.message)
    } else if (res.status === 500) {
      throw new Error('Contact the maker')
    }
  }
}

export { authentication, logout, logDetails, objectForSubmission, deleteTag }
