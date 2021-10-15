import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ImStarFull } from 'react-icons/im'

import LoginModal from './modal/loginModal'
import { AuthContext } from '../context/authContext'

const ImageComponent = ({ url, info }) => {
  const history = useHistory()
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const [openLogin, setOpenLogin] = useState(false)
  const {
    id,
    userId,
    title,
    introduction,
    userNickName,
    category,
    mainImg,
    tasteAvg,
    easyAvg,
    createdAt,
  } = info

  const toPost = () => {
    if (isLoggedIn) {
      history.push(`/recipe/id=${id}`)
    } else {
      setOpenLogin(!openLogin)
    }
  }

  return (
    <>
      <Background className="back" onClick={toPost}>
        <ScoreWrap>
          <span className="score">간편성: &nbsp;{easyAvg}</span>
          <ImStarFull className="icon" />
        </ScoreWrap>
        <ScoreWrap>
          <span className="score">맛: &nbsp;{tasteAvg}</span>
          <ImStarFull className="icon" />
        </ScoreWrap>
        <p className="title">{title}</p>
        <div className="editor">작성자 : {userNickName}</div>
        <p className="date">게시일 : {createdAt.substring(0, 10)}</p>
        <div className="instruction">{introduction}</div>
      </Background>
      <BackImg style={{ backgroundImage: `url(${url})` }}></BackImg>
      <Modal>
        {openLogin ? (
          <LoginModal openLogin={openLogin} setOpenLogin={setOpenLogin} />
        ) : null}
      </Modal>
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
  z-index: 1;
  background: #2e2e2e92;
  border-radius: 15%;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
  opacity: 0;
  transition: all 0.3s linear;
  overflow-y: hidden;
  padding: 0 20px;
  .score {
    position: absolute;
    bottom: 1.5px;
    right: 10px;
    color: white;
  }
  .title {
    color: rgb(255, 255, 255);
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 15px;
  }
  .editor {
    color: white;
  }
  .date {
    width: 100%;
    font-size: 12px;
    color: white;
    padding-bottom: 10px;
    border-bottom: solid 0.3mm white;
  }
  .instruction {
    margin-top: 20px;
    color: white;
  }
  :hover {
    opacity: 1;
    box-shadow: 5px 5px 6px 6px rgba(155, 150, 150, 0.6);
    z-index: 0;
  }
`

const ScoreWrap = styled.div`
  position: relative;
  top: 20px;
  right: 16px;
  .icon {
    color: rgb(247, 215, 36);
    margin-left: 100%;
  }
`

const Modal = styled.div`
  position: absolute;
`

export default ImageComponent
