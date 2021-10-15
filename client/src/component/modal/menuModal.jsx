import React, { useContext } from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import LoginModal from './loginModal'
import SearchBoxModal from './searchBoxModal'
import { UserContext } from '../../context/userContext'
import { AuthContext } from '../../context/authContext'

const MenuModal = ({
  changeMenu,
  openLogin,
  setOpenLogin,
  setShowSearchBox,
  logout,
}) => {
  const { userInfo } = useContext(UserContext)
  const { isLoggedIn } = useContext(AuthContext)
  return (
    <Modal onClick={changeMenu}>
      {!isLoggedIn ? (
        <Form>
          <Container>
            <TitleWrap>
              <Title>Menu</Title>
            </TitleWrap>
            <List to="/recipe">레시피</List>
            <Search onClick={() => setShowSearchBox(true)}>검색</Search>
            <SearchBoxModal />
            <List to="/Login" onClick={() => setOpenLogin(true)}>
              로그인
            </List>
            {openLogin ? <LoginModal /> : null}
          </Container>
        </Form>
      ) : (
        <Form>
          <Container>
            <TitleWrap>
              <Title>Menu</Title>
            </TitleWrap>
            <List to="/recipe">레시피</List>
            <Search onClick={() => setShowSearchBox(true)}>검색</Search>
            <SearchBoxModal />
            <List to="/write">새 글 작성</List>
            <List to={`/mypage/${userInfo.email}`}>{userInfo.nickname}님</List>
            <List to="/" onClick={logout}>
              로그아웃
            </List>
          </Container>
        </Form>
      )}
    </Modal>
  )
}

const Modal = styled.div`
  z-index: 999;
  position: fixed;
  background: #606060;
  opacity: 90%;
  display: grid;
  width: 100%;
  height: 200%;
  overflow-y: hidden;
  align-items: center;
  animation: back 0.5s ease-in;
  @keyframes back {
    from {
      opacity: 0%;
    }
    to {
      opacity: 80%;
    }
  }
`
const Form = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: menu 0.5s ease-in;
  animation-fill-mode: forwards;
  @keyframes menu {
    from {
      top: 0%;
      opacity: 50%;
    }
    to {
      top: 20%;
      opacity: 100%;
    }
  }
`
const Container = styled.div`
  border-radius: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
`

const TitleWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  color: white;
  font-size: 40px;
  margin-bottom: 50px;
`
const List = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 25px;
  margin-bottom: 20px;
  :hover {
    color: rgb(255, 183, 0);
  }
`
const Search = styled.div`
  color: white;
  font-size: 25px;
  margin-bottom: 20px;
  :hover {
    color: rgb(255, 183, 0);
  }
`
export default MenuModal
