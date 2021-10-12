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
        <ScoreWrap>
        <span className="score">
          4.87
        </span>
        <ImStarFull className="icon" />
        </ScoreWrap>
        <p className="title">Title</p>
        <div className="editor">
          editor : 우주
        </div>
        <p className='date'>2021. 04. 06</p>
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
  box-shadow: 5px 5px 5px 5px rgba(182, 176, 176, 0.3);
`

const Background = styled.div`
  position: absolute;
  width: 268px;
  height: 301px;
  background: #2e2e2e92;
  border-radius: 15%;
  text-align: left;
  opacity: 0;
  transition: all 0.3s linear;
  .score {
    padding-bottom : 5px;
    color : white;
  }
  .title {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 15px;
    margin-left : 15px;
  }
  .icon {
    color: rgb(247, 215, 36);
    margin-top : 3.7px;
    margin-left : 5px;
  }
  .editor {
    margin-left : 15px;
    color: white;
  }
  .date {
    margin-left : 15px;
    width : 100%;
    font-size: 12px;
    color : white;
    padding-bottom : 10px;
    border-bottom: solid 0.3mm white;
  }
  .instruction {
    margin-left : 15px;
    margin-top: 20px;
    color : white;
  }
  :hover {
    opacity: 1;
    box-shadow: 5px 5px 6px 6px rgba(155, 150, 150, 0.6);
  }
`

const ScoreWrap = styled.div`
display: flex;
justify-content: flex-end;
margin-right : 15px;
margin-top : 20px;
`
export default ImageComponent
