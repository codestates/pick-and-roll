import React, { useState } from 'react'
import styled from 'styled-components'
import { FaAngleDown } from 'react-icons/fa'
const Dropdown = ({ handleChangeDivision }) => {
  const [isActive, setIsActive] = useState(false)
  const [showDivision, setShowDivision] = useState('최신')

  const options = ['최신', '맛', '간편성']
  return (
    <Container>
      <DropdownBox>
        <DropdownBtn
          className={!isActive ? 'show' : null}
          onClick={() => setIsActive(!isActive)}
        >
          {showDivision}
          <FaAngleDown />
        </DropdownBtn>
        {isActive && (
          <Contents>
            {options.map((option) => (
              <Item
                onClick={() => {
                  handleChangeDivision(option)
                  setShowDivision(option)
                  setIsActive(false)
                }}
              >
                {option}
              </Item>
            ))}
          </Contents>
        )}
      </DropdownBox>
    </Container>
  )
}

const Container = styled.div`
  position : static;
  z-index: 50;
  margin-top: 7px;
  margin-right: 100px;
`

const DropdownBox = styled.div`
  width: 100px;
  position: relative;
  z-index: 30;
`

const DropdownBtn = styled.div`
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .show {
    border-radius: 10%;
  }
`

const Contents = styled.div`
  margin-top: -1px;
  position : static;
  z-index: 50;
  left: 0;
  padding: 10px;
  background: #fff;
  box-shadow: 3px 3px 10px 1px rgba(0, 0, 0, 0.06);
  border-radius: 0 0 10% 10%;
  font-weight: 500;
  color: #4f4e4e;
  width: 80%;
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
  padding: 10px;

  :hover {
    z-index: 500;
    background: #fcfcfc;
  }
`

export default Dropdown