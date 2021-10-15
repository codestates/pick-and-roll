import React, { useState } from 'react'
import styled from 'styled-components'
import { FaAngleDown } from 'react-icons/fa'
import { ImStarHalf } from 'react-icons/im'
import { ImStarFull } from 'react-icons/im'

const DropdownStar = ({ selected, setSelected, color }) => {
  const [isActive, setIsActive] = useState(false)

  const starClick = (e) => {
    setSelected(e.target.value)
    setIsActive(false)
  }

  return (
    <Container>
      <DropdownBox>
        <DropdownBtn
          className={!isActive ? `show ${color}` : `${color}`}
          onClick={() => setIsActive(!isActive)}
        >
          {selected}
          <FaAngleDown />
        </DropdownBtn>
        {isActive && (
          <Contents className={color}>
            <Item
              value="선택"
              onClick={(e) => {
                starClick(e)
              }}
            />
            <Item
              value="5점"
              onClick={(e) => {
                setSelected(5)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
            </Item>
            <Item
              value="4.5점"
              onClick={(e) => {
                setSelected(4.5)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarHalf />
            </Item>
            <Item
              value="4점"
              onClick={(e) => {
                setSelected(4)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
            </Item>
            <Item
              value="3.5점"
              onClick={(e) => {
                setSelected(3.5)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
              <ImStarHalf />
            </Item>
            <Item
              value="3점"
              onClick={(e) => {
                setSelected(3)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarFull />
            </Item>
            <Item
              value="2.5점"
              onClick={(e) => {
                setSelected(2.5)
              }}
            >
              <ImStarFull />
              <ImStarFull />
              <ImStarHalf />
            </Item>
            <Item
              value="2점"
              onClick={(e) => {
                setSelected(2)
              }}
            >
              <ImStarFull />
              <ImStarFull />
            </Item>
            <Item
              value="1.5점"
              onClick={(e) => {
                setSelected(1.5)
              }}
            >
              <ImStarFull />
              <ImStarHalf />
            </Item>
            <Item
              value="1점"
              onClick={(e) => {
                setSelected(1)
              }}
            >
              <ImStarFull />
            </Item>
            <Item
              value="0.5점"
              onClick={(e) => {
                setSelected(0.5)
              }}
            >
              <ImStarHalf />
            </Item>
          </Contents>
        )}
      </DropdownBox>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  z-index: 50;
`

const DropdownBox = styled.div`
  width: 50px;
  margin-left: 10px;
  .show_red,
  .red {
    background-color: #eee9e8f8;
  }
  .show_blue,
  .blue {
    background-color: #eee9e8f8;
  }
`

const DropdownBtn = styled.div`
  height: 15px;
  padding: 10px;
  width: 160px;
  //margin-left: 200px;
  //background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Contents = styled.div`
  position: absolute;
  margin-top: -1px;
  left: 30;
  padding: 10px;
  background-color: #1e6add;
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.06);
  border-radius: 0 0 10% 10%;
  font-weight: 500;
  color: #333;
  width: 160px;
  animation: box 0.3s ease-in;
  animation-fill-mode: forwards;
  @keyframes box {
    from {
      opacity: 30%;
    }
    to {
      opacity: 100%;
    }
  }
`

const Item = styled.div`
  padding: 4px;
  padding-left: 20px;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 7px;
  justify-content: right;
  color: #eec409e8;
  :hover {
    background: #fcfcfc9d;
    border-radius: 10%;
  }
`

export default DropdownStar
