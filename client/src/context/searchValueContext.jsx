import React, { useState } from 'react'

export const SearchValueContext = React.createContext()

export const SearchValueContextProvider = (props) => {
  const [isValue, setIsValue] = useState('')

  return (
    <div>
      <SearchValueContext.Provider value={{ isValue, setIsValue }}>
        {props.children}
      </SearchValueContext.Provider>
    </div>
  )
}