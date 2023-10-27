import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      light: '#5169a5',
      main: '#1e3f76',
      dark: '#001a4a',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffed73',
      main: '#ffbb41',
      dark: '#c88b00',
      contrastText: '#000000'
    },
    background: {
      default: '#FFFFFF'
    }
  },
  zIndex: {
    myAppBar: 1201
  }
})

export default theme
