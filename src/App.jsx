import { SnackbarProvider } from 'notistack'
import HomePage from './Pages/HomePage/HomePage'

function App() {
  
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <HomePage />
    </SnackbarProvider>
  )
}

export default App
