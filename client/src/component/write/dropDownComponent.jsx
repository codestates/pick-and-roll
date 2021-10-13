import React, { useCallback } from 'react'
import styled from 'styled-components'

export const DropDownCategory = ({ category, setCategory, categoryRef }) => {
  const onChangeCategory = useCallback((event) => {
    setCategory(event.target.value)
  })

  return (
    <Wrapper>
      <input
        type="text"
        placeholder="카테고리"
        onChange={(e) => onChangeCategory(e)}
        value={category}
        ref={categoryRef}
      />
      <select onChange={(e) => onChangeCategory(e)}>
        <option>선택</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="기타">기타</option>
      </select>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 30px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  resize: none;
  input {
    height: 80%;
    width: 100%;
    margin-top: 3px;
    outline: none;
    text-align: center;
    border: 0mm #f7f4f41c;
    @media (max-width: 750px) {
      font-size: 10px;
    }
  }
  select {
    border: 0mm #f7f4f41c;
    width: 80%;
    height: 100%;
    text-align: center;
    outline: none;
  }
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
`
export default DropDownCategory
