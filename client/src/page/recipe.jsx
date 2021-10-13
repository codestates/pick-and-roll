import React, { useState } from 'react'
import Category from '../component/category/category'
import GetImgComponent from '../component/getImagesComponent'

const Recipe = () => {
  const [selectCategory, setSelectCateogry] = useState('all')
  const [selected, setSelected] = useState('최신')

  return (
    <>
      <Category
        selected={selected}
        setSelected={setSelected}
        setSelectCateogry={setSelectCateogry}
      />
      <GetImgComponent selectCategory={selectCategory} selected={selected} />
    </>
  )
}

export default Recipe
