import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import { FaRegTimesCircle } from 'react-icons/fa'
import Swal from 'sweetalert2'
import api from '../../api'
import { AuthContext } from '../../context/authContext'
import { UserContext } from '../../context/userContext'
import { KAKAO_AUTH_URL } from '../kakao/OAuth'

const LoginModal = ({ openLogin, setOpenLogin }) => {
  function handleKakao(e) {
    window.location.href = KAKAO_AUTH_URL
  }
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const { userInfo, setUserInfo } = useContext(UserContext)

  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageAuth, setMessageAuth] = useState('')

  const logIn = async (event) => {
    if (email === '' || password === '') {
      Swal.fire({
        text: '이메일과 비밀번호를 모두 입력해주세요!',
        icon: 'warning',
        confirmButtonColor: '#d2d2d2',
        confirmButtonText: '확인',
      })
    } else {
      await api
        .post(
          '/users/signin',
          { email, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`
          let { id, email, nickname, description, createdAt } =
            res.data.userData
          createdAt = createdAt.substring(0, 10)
          let user = { id, email, nickname, description, createdAt }
          setUserInfo(user)
          setIsLoggedIn(true)
          setOpenLogin(false)
        })
        .catch((err) => {
          setMessageAuth('계정 정보를 확인해주세요!')
        })
    }
    event.preventDefault()
  }

  useEffect(() => {
    if (userInfo) {
    }
  })

  return openLogin ? (
    <Modal>
      <Left onClick={() => setOpenLogin(false)}></Left>
      <Form>
        <LoginWrapper>
          <CancelIcon onClick={() => setOpenLogin(false)}>
            <FaRegTimesCircle />
          </CancelIcon>
          <Login>Login</Login>
          <LoginC>
            <InputC>
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                }}
              />
            </InputC>
            <InputC>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    logIn(event)
                  }
                }}
              />
            </InputC>
            <CheckText>{messageAuth}</CheckText>
            <LoginBtn onClick={logIn}>Login</LoginBtn>
            <SignUpBtn onClick={() => setOpenLogin(false)}>
              <p>회원가입을 원하시나요?</p>
              <div
                className="makeaccount"
                onClick={() => {
                  history.push('/signup')
                }}
              >
                Sign Up
              </div>
            </SignUpBtn>
            <SocialLoginBtn onClick={handleKakao}>kakao</SocialLoginBtn>
            <CancelIcon onClick={() => setOpenLogin(false)}>
              <FaRegTimesCircle />
            </CancelIcon>
          </LoginC>
        </LoginWrapper>
      </Form>
      <Right onClick={() => setOpenLogin(false)}></Right>
    </Modal>
  ) : null
}

const Modal = styled.div`
  z-index: 999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(72, 72, 66, 0.5);
  display: flex;
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

const Left = styled.div`
  width: 35%;
`

const Right = styled.div`
  width: 35%;
`

const Form = styled.div`
  width: 30%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const LoginWrapper = styled.div`
  position: relative;
  width: 450px;
  background: white;
  border-radius: 30px;
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
`

const LoginC = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  padding: 25px 0px;
`

const Login = styled.div`
  text-align: center;
  font-size: 32px;
  margin-bottom: 20px;
  margin-top: 30px;
`

const InputC = styled.div`
  margin-top: 15px;
  text-align: center;
`

const Input = styled.input`
  width: 200px;
  height: 15px;
  align-items: center;
  padding: 15px 50px 10px 10px;
  border-radius: 8px;
  border: 2px solid #d2d2d2;
  :focus {
    border: 2px solid rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
  }
`

const LoginBtn = styled.div`
  width: 67%;
  text-align: center;
  padding: 10px;
  background-color: #d2d2d2;
  margin: 15px auto;
  border-radius: 15px;
  box-sizing: border-box;
  color: white;
  :hover {
    font-weight: bold;
    background-color: rgb(243, 200, 18);
  }
`

const SocialLoginBtn = styled.div`
  width: 67%;
  text-align: center;
  padding: 10px;
  background-color: #17a717;
  margin: 15px auto;
  border-radius: 15px;
  box-sizing: border-box;
  color: white;
  :hover {
    font-weight: bold;
  }
`

const SignUpBtn = styled.div`
  width: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #3f3f3f;
  font-size: 13px;
  .makeaccount {
    margin: 0 10px;
    padding: 0 10px;
    font-size: 17px;
    line-height: 2;
    text-align: left;
    color: rgb(237, 199, 32);
    cursor: pointer;
    :hover {
      font-weight: bold;
    }
  }
`

const CheckText = styled.div`
  height: 3px;
  text-align: left;
  font-size: 11px;
  margin-left: 5px;
  margin-top: 3px;
  color: rgb(255, 75, 75);
`

const CancelIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 20px;
  color: #a4a4a4;
  :hover {
    color: rgb(237, 199, 32);
  }
`

export default LoginModal
