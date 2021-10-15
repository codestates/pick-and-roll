import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [userInfo, setUserInfo] = useState(() => JSON.parse(window.localStorage.getItem('userInfo')) || {})

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, [userInfo])

  return (
    <div>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        {props.children}
      </UserContext.Provider>
    </div>
  )
}