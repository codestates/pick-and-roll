import React from 'react'
import styled from 'styled-components'
import Dropdown from './dropdown'

const Category = ({ handleChangeCategory, handleChangeDivision }) => {
  return (
    <>
    <Wrap>
      <Dropdown handleChangeDivision={handleChangeDivision} />
      <ListWrap>
        <List onClick={() => {handleChangeCategory('korean')}}>Korean</List>
        <List onClick={() => {handleChangeCategory('western')}}>Western</List>
        <List onClick={() => {handleChangeCategory('chinese')}}>Chinese</List>
        <List onClick={() => {handleChangeCategory('japanese')}}>Japanese</List>
        <List onClick={() => {handleChangeCategory('etc')}}>etc</List>
      </ListWrap>
    </Wrap>
  </>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 60px;
  top : 70px;
  display: flex;
  position : fixed;
  justify-content: center;
  border-bottom: solid 1px rgb(243, 200, 18);
  background-color : white;
  z-index: 50;
`

const ListWrap = styled.div`
  display: flex;
`

const List = styled.li`
  font-size: 20px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  color : #7d7d7d;
  border-bottom: 10px;
  box-sizing : border-box;
  :hover {
    border-bottom: solid 3px rgb(243, 200, 18);
    font-weight:bold;
    cursor: pointer;
  }
`

export default Category
