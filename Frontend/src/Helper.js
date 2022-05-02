import { api, host } from './config'
import { DataBaseError, TokenError } from './CustomErrors'

const animals = ['cow', 'buffalo']

const logout = (navigate) => {
  localStorage.clear()
  navigate('/login', { replace: true })
}

const fetchDetails = async (animal, tag) => {
  const token = localStorage.getItem('token')
  const subRoute = animal ? `/${animal}/${tag}` : ''
  const res = await fetch(api + subRoute, {
    method: 'GET',
    headers: {
      'x-auth-token': token,
    },
  })
  if (!animal) return res.ok
  if (res.ok) {
    const ret = await res.json()
    return ret
  } else {
    if (res.status === 404) {
      throw new DataBaseError(res.message)
    } else if (res.status === 500) {
      alert('Contact the maker')
    } else {
      throw new TokenError(res.message)
    }
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
  const object = Object.assign(
    Object.fromEntries(
      Array.from(form.getElementsByTagName('input')).map((element) => {
        if (element.value === '' || element.value === '0') {
          if (element.required) throw new Error(`${element.name} required`)
          else return [element.name, undefined]
        }
        switch (element.type) {
          case 'number':
            return [element.name, parseFloat(element.value)]
          case 'date':
            return [element.name, new Date(element.value)]
          case 'checkbox':
            return [element.name, element.checked]
          default:
            return [element.name, element.value]
        }
      })
    ),
    obj
  )
  Object.entries(object).forEach(([key, value]) => {
    if (value === undefined) delete object[key]
  })
  return object
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

const animalTranslate = (animal, calf = 0, lang = 0) => {
  if (lang) {
    return animal.charAt(0).toUpperCase() + animal.slice(1)
  }
  const animals = {
    cow: 'गाय',
    buffalo: 'भैंस',
  }
  const calves = {
    cow: 'पड़िया',
    padiya: 'पड़िया',
    female: 'पड़िया',
    bull: 'पाड़ा',
    pada: 'पाड़ा',
    male: 'पाड़ा',
  }

  return calf ? calves[animal.toLowerCase()] : animals[animal.toLowerCase()]
}

const nearToday = (date, compareTo, days = 15) => {
  const todayDate = new Date(compareTo).getDate()
  const before = new Date()
  before.setDate(todayDate - days)
  const after = new Date()
  after.setDate(todayDate + days)

  if (typeof date === 'string') date = new Date(date)
  return date > before && date < after
}

const displayDate = ({
  date,
  year = 'numeric',
  month = 'numeric',
  day = 'numeric',
  lang = 'IN',
}) => {
  if (typeof date === 'string') date = new Date(date)

  return date.toLocaleDateString(lang, {
    day: day,
    month: month,
    year: year,
  })
}

const deleteDetails = async (subRoute, body = {}) => {
  const token = localStorage.getItem('token')
  const res = await fetch(api + subRoute, {
    method: 'DELETE',
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (res.ok) {
    return true
  } else {
    if (res.status === 409) {
      throw new DataBaseError('Invalid request')
    } else if ([408, 403, 400].includes(res.status)) {
      throw new TokenError('LogIn again')
    } else if (res.status === 500) {
      throw new Error('Contact the maker')
    }
  }
}

const romanize = (num) => {
  if (isNaN(num)) return NaN
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ],
    roman = '',
    i = 3
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman
  return Array(+digits.join('') + 1).join('M') + roman
}

export {
  animals,
  authentication,
  logout,
  logDetails,
  objectForSubmission,
  deleteDetails,
  fetchDetails,
  animalTranslate,
  displayDate,
  nearToday,
  romanize,
}
