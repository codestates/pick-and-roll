import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MyInfoComponent from './mypage/myInfoComponent'
import MyFavoriteComponent from './mypage/myFavoriteComponent'
import MyRecipeComponent from './mypage/myRecipeComponent'

const SideMenuComponent = () => {
  const [page, setPage] = useState('myInfo')
  const [show, setShow] = useState(false)

  const changeFavorite = () => setPage('favorite')
  const changeMyRecipe = () => setPage('myRecipe')
  const changeMyInfo = () => setPage('myInfo')

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Wrap>
      <Menu className={show ? 'showM' : ''}>
        <MenuTitle>Menu</MenuTitle>
        <List className="myInfo" onClick={changeMyInfo}>
          나의 정보
        </List>
        <List className="favorite" onClick={changeFavorite}>
          즐겨찾기
        </List>
        <List className="myRecipe" onClick={changeMyRecipe}>
          나의 레시피
        </List>
      </Menu>
      <ContentWapper>
        {(() => {
          switch (page) {
            case 'myRecipe':
              return <MyRecipeComponent />
            case 'favorite':
              return <MyFavoriteComponent />
            case 'myInfo':
              return <MyInfoComponent />
            default:
          }
        })()}
      </ContentWapper>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  display: flex;
  top: 70px;
  z-index: 0;
  justify-content: flex-end;
  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: flex-start;
  }
  .showM {
    transform: translateX(0);
    animation-duration: 1s;
    animation-name: show;
  }
  @keyframes show {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
  ::after {
    display: inline-block;
    clear: both;
    content: '';
  }
`

const Menu = styled.div`
  z-index: -1;
  left: 0;
  transform: translateX(-100%);
  position: fixed;
  margin: 0;
  border: 0;
  padding: 0;
  height: 90%;
  width: 273px;
  background-color: #f3c811;
  color: white;
  @media (max-width: 1200px) {
    position: fixed;
    display: flex;
    height: 50px;
    width: 100%;
    align-items: center;
  }
`

const ContentWapper = styled.div`
  margin-top: 30px;
  width: calc(100% - 273px);
  @media (max-width: 1200px) {
    width: 100%;
    margin-top: 75px;
  }
`

const MenuTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 30px;
  padding: 30px 0;
  @media (max-width: 1200px) {
    display: none;
  }
`
const List = styled.div`
  text-align: center;
  width: 100%;
  padding: 10px 0;
  font-family: 'Noto Sans KR', sans-serif;
  margin-bottom: 5px;
  :hover {
    color: #f3c811;
    background-color: #ffffff;
    font-weight: bold;
  }
  @media (max-width: 1200px) {
    margin: 0;
  }
`

export default SideMenuComponent
