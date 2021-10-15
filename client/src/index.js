import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { AuthContextProvider } from './context/authContext'
import { UserContextProvider } from './context/userContext'
import { SearchValueContextProvider } from './context/searchValueContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <SearchValueContextProvider>
          <App />
        </SearchValueContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
