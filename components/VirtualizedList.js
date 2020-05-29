import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import ListSubheader from '@material-ui/core/ListSubheader'
import { useTheme } from '@material-ui/core/styles'
import { VariableSizeList } from 'react-window'
import customers from '../api/customers'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import matchSorter from 'match-sorter'

const LISTBOX_PADDING = 8 // px

function renderRow (props) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING
    }
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache (data) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent (props, ref) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width='100%'
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType='ul'
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

export default ListboxComponent
/*
export default function Virtualize ({ errors, formMargin }) {
  const filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, { keys: [item => item.name] })
  return (
    <>
      <Autocomplete
        id='customers'
        multiple
        options={customers}
        filterOptions={filterOptions}
        fullWidth
        style={{ marginBottom: formMargin }}
        ListboxComponent={ListboxComponent}
        getOptionSelected={(option, value) => option.account === value.account}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} error={!!errors.customers} helperText={!!errors.customers && 'Customers Cannot Be Blank'} label='Customers' variant='outlined' />}
        renderOption={(option, { inputValue }) => {
          const fullOption = `${option.account}-${option.name}`
          const matches = match(fullOption.trim(), inputValue)
          const parts = parse(fullOption.trim(), matches)
          return (
            <div>
              {parts.map((part, index) => (
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}
            </div>
          )
        }}
      />
    </>
  )
}
*/
