import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { NavLink as NavLinkLogo, NavLink as NavLinkElement } from 'react-router-dom'
import { FaAlignJustify } from 'react-icons/fa'
import LoginModal from './modal/loginModal'
import SearchBoxModal from './modal/searchBoxModal'
import api from '../api'
import { AuthContext } from '../context/authContext'
import { UserContext } from '../context/userContext'
import MenuModal from './modal/menuModal'

const NavbarComponent = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [openLogin, setOpenLogin] = useState(false)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const logout = async () => {
    await api.post('/users/logout').then((res) => {
      setIsLoggedIn(false)
      setUserInfo({})
      setOpenLogin(false)
    })
  }

  const changeMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <Nav>
      {!isLoggedIn ? (
        <BeforeLoginView>
          <Logo className="logo" to="/">
            Pick & Roll
          </Logo>
          <MenuLinks>
            <NavElement to="/recipe">레시피</NavElement>
            <ChangeClick onClick={() => setShowSearchBox(true)}>
              검색
            </ChangeClick>
            <ChangeClick to="/" onClick={() => setOpenLogin(true)}>
              로그인
            </ChangeClick>
          </MenuLinks>
          <Modal>
            <SearchBoxModal
              showSearchBox={showSearchBox}
              setShowSearchBox={setShowSearchBox}
            />
          </Modal>
          <Modal>
            {openLogin ? (
              <LoginModal
                openLogin={openLogin}
                setOpenLogin={setOpenLogin}
              />
            ) : null}
          </Modal>
          <MenuIcon onClick={changeMenu}>
            <FaAlignJustify />
          </MenuIcon>
          {openMenu ? (
            <MenuModal
              isLoggedIn={isLoggedIn}
              changeMenu={changeMenu}
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              setShowSearchBox={setShowSearchBox}
              logout={logout}
            />
          ) : null}
        </BeforeLoginView>
      ) : (
        <AfterLoginView>
          <Logo to="/">Pick & Roll</Logo>
          <MenuLinks>
            <NavElement to="/recipe">레시피</NavElement>
            <ChangeClick onClick={() => setShowSearchBox(true)}>
              검색
            </ChangeClick>
            <NavElement to="/write">새 글 작성</NavElement>
            <NavElement to={`/mypage/${userInfo.email}`}>
              {userInfo.nickname}님
            </NavElement>
            <NavElement to="/" onClick={logout}>
              로그아웃
            </NavElement>
          </MenuLinks>
          <MenuIcon onClick={changeMenu}>
            <FaAlignJustify />
          </MenuIcon>
          <Modal>
            <SearchBoxModal
              showSearchBox={showSearchBox}
              setShowSearchBox={setShowSearchBox}
            />
          </Modal>
          {openMenu ? (
            <MenuModal
              isLoggedIn={isLoggedIn}
              changeMenu={changeMenu}
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              setShowSearchBox={setShowSearchBox}
              logout={logout}
            />
          ) : null}
        </AfterLoginView>
      )}
    </Nav>
  )
}

const Nav = styled.nav`
  background-color: white;
  margin: 0px;
  box-shadow: 0px 1px 10px 1px rgb(243, 200, 18);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
`

const MenuLinks = styled.div`
  display: flex;
  position: relative;
  @media (max-width: 750px) {
    display: none;
  }
`

const Modal = styled.div`
  position: absolute;
`

const BeforeLoginView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  @media (max-width: 750px) {
    height: 70px;
  }
`

const AfterLoginView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  @media (max-width: 750px) {
    height: 70px;
  }
`

const Logo = styled(NavLinkLogo)`
  text-decoration: none;
  font-size: 40px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: bold;
  color: rgb(243, 200, 18);
  margin-left: 16px;
  @media (max-width: 1200px) {
    margin-left: 2px;
    font-size: 30px;
  }
`

const ChangeClick = styled.div`
  text-align: end;
  margin: 10px 15px;
  font-size: 15px;
  padding: 10px 15px;
  font-family: 'Noto Sans KR', sans-serif;
  text-decoration: none;
  color: rgb(243, 200, 18);
  :hover {
    cursor: pointer;
    background-color: rgb(243, 200, 18);
    color: white;
    border-radius: 10%;
    font-weight: bold;
  }
`

const NavElement = styled(NavLinkElement)`
  text-align: end;
  margin: 10px 15px;
  font-size: 15px;
  padding: 10px 15px;
  font-family: 'Noto Sans KR', sans-serif;
  text-decoration: none;
  color: rgb(243, 200, 18);
  :hover {
    cursor: pointer;
    background-color: rgb(243, 200, 18);
    color: white;
    border-radius: 10%;
    font-weight: bold;
  }
`

const MenuIcon = styled.div`
  display: none;
  height: 25px;
  margin-right: 8px;
  @media (max-width: 750px) {
    display: inline-block;
    color: rgb(243, 200, 18);
    font-size: 25px;
  }
`

const TestBtn = styled.button`
  border: solid, 1px, gray;
  text-decoration: none;
  background-color: rgb(235, 235, 235);
  height: 25px;
  margin-top: 8px;
  color: rgb(243, 200, 18);
  border: 1px solid transparent;
  padding: 5px 12px;
  .testbtn:hover {
    cursor: pointer;
  }
`

export default NavbarComponent
