import React from 'react'
import styled from 'styled-components'
import { ImStarFull } from 'react-icons/im'

const ImageComponent = ({ url, datas }) => {
  // const { //
  //   id,
  //   UserId,
  //   title,
  //   introduction,
  //   category,
  //   requiredTime,
  //   mainImg
  // } = datas

  return (
    <>
      <Background className="back">
        <span className="score">
          {' '}
          &nbsp;'점수'&nbsp; &nbsp;
          <ImStarFull className="icon" />
          &nbsp;
        </span>
        <br />
        <span className="title">Title</span>
        <br />
        <br />
        <br />
        <div className="email">
          email@naver.com
          <br />
          <span>2021. 04. 06</span>
        </div>
        <div className="instruction">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sint veritati...
        </div>
      </Background>
      <BackImg style={{ backgroundImage: `url(${url})` }}></BackImg>
    </>
  )
}

const BackImg = styled.div`
  width: 268px;
  height: 301px;
  border-radius: 15%;
  object-fit: cover;
  background-size: 100% 100%;
  transition: all 0.6s linear;
  background-repeat: no-repeat;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px 5px rgba(182, 176, 176, 0.979);
`

const Background = styled.div`
  position: absolute;
  width: 268px;
  height: 301px;
  background: #aeb4b696;
  border-radius: 15%;
  text-align: left;
  padding: 2%;
  opacity: 0;
  transition: all 0.3s linear;
  .score {
    display: flex;
    justify-content: right;
  }
  .title {
    color: rgb(21, 255, 0);
    font-size: 24px;
    font-weight: bold;
  }
  .icon {
    color: rgb(231, 235, 13);
  }
  .email {
    padding-bottom: 26px;
    color: white;
    border-bottom: solid 0.3mm black;
  }
  .email span {
    font-size: 12px;
  }
  .instruction {
    margin-top: 20px;
  }
  :hover {
    opacity: 1;
    box-shadow: 0px 0px 9px 9px rgba(155, 150, 150, 0.979);
  }
`

export default ImageComponent
