export const logout = (navigate) => {
  localStorage.clear()
  navigate('/login')
}

export const animalTranslate = (animal, calf = 0, lang = 0) => {
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
    bull: 'पड़ा',
    pada: 'पड़ा',
    male: 'पड़ा',
  }

  return calf ? calves[animal.toLowerCase()] : animals[animal.toLowerCase()]
}

export const generateTag = ({ animal, tag }) => {
  return `${animal[0].toUpperCase()}-${tag}`
}

export const displayDate = ({
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

export const nearToday = (date, days = 15, compareTo = new Date()) => {
  const todayDate = new Date(compareTo).getDate()
  const before = new Date()
  before.setDate(todayDate - days)
  const after = new Date()
  after.setDate(todayDate + days)

  if (typeof date === 'string') date = new Date(date)
  return date > before && date < after
}

export const romanize = (num) => {
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
