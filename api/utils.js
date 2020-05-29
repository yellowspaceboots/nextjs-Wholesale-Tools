import { useRef, useState, useEffect } from 'react'

export const groupBy = (arr, property) => {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) { memo[x[property]] = [] }
    memo[x[property]].push(x)
    return memo
  }, {})
}

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

export const getStatusColor = (status) => {
  const statusColors = {
    'On Track': 'green',
    'At Risk': '#ffbb41',
    'Off Track': '#d32f2f',
    Open: '#1e3f76',
    Pending: '#ffbb41',
    Won: 'green',
    Lost: '#d32f2f'
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
