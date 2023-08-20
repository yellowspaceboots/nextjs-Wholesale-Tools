import cookie from 'cookie'

export const groupBy = (arr, property) => {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) { memo[x[property]] = [] }
    memo[x[property]].push(x)
    return memo
  }, {})
}
/*
export const useHover = () => {
  const [value, setValue] = useState(false)

  const ref = useRef(null)

  const handleMouseOver = () => setValue(true)
  const handleMouseOut = () => setValue(false)

  useEffect(
    () => {
      const node = ref.current
      if (node) {
        node.addEventListener('mouseover', handleMouseOver)
        node.addEventListener('mouseout', handleMouseOut)

        return () => {
          node.removeEventListener('mouseover', handleMouseOver)
          node.removeEventListener('mouseout', handleMouseOut)
        }
      }
    },
    [ref.current] // Recall only if ref changes
  )

  return [ref, value]
}
*/
export const getStatusColor = (status) => {
  const statusColors = {
    'On Track': 'green',
    'At Risk': '#ff8741',
    'Off Track': '#d32f2f',
    Open: '#1e3f76',
    Pending: '#ffbb41',
    Won: 'green',
    Lost: '#d32f2f',
    Closed: 'lightgrey'
  }
  const statusColor = statusColors[status] || 'lightgrey'
  return statusColor
}

export const getStatusFontColor = (status) => {
  const statusColors = {
    'On Track': 'white',
    'At Risk': 'black',
    'Off Track': 'white',
    Open: 'white',
    Pending: 'black',
    Won: 'white',
    Lost: 'white',
    Closed: 'black'
  }
  const statusColor = statusColors[status] || 'lightgrey'
  return statusColor
}

export const amountShortFormat = (amount) => {
  const defaultPrecision = 4
  const cross = {
    0: '',
    3: 'K',
    6: 'M',
    9: 'B',
    12: 'T'
  }
  const easyButton = {
    0: 0,
    1: 0,
    2: 0,
    3: 3,
    4: 3,
    5: 3,
    6: 6,
    7: 6,
    8: 6,
    9: 9,
    10: 9,
    11: 9,
    12: 12,
    13: 12,
    14: 12
  }
  const prefix = '$'
  const len = Math.ceil(Math.log10(amount + 1)) - 1
  const finalLen = len <= defaultPrecision ? 0 : len - defaultPrecision
  const group = easyButton[finalLen]
  const formattedDivider2 = [...new Array(group + defaultPrecision)].reduce((accumulator, currentValue) => accumulator * 10, 1)
  const value = amount / formattedDivider2
  const suffix = cross[group]
  const finalValue = Math.round(value * 100) / 100
  const final = `${prefix}${finalValue}${suffix}`

  return final
}

export const pad = (n, width, z) => {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }

  return true
}

const isObject = (object) => {
  return object != null && typeof object === 'object'
}

export const safelyGetNestedValue = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

export const parseCookies = req => {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie)
}
