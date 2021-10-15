import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(window.localStorage.getItem('isLoggedIn')) || false)

  useEffect(() => {
    window.localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  )
}