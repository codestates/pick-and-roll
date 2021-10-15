import React, { useState, useRef } from 'react'
import Swal from 'sweetalert2'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import api from '../../api/index'

const ChangePasswordComponent = () => {
  const [password, setPassword] = useState('')
  const [pwCheck, setPwCheck] = useState('')

  const history = useHistory()

  const [messagePassword, setMessagePassword] = useState('')
  const [messagePwCheck, setMessagePwCheck] = useState('')

  // 비밀번호 형식을 체크하는 정규 표현식
  const password_Reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/

  // focus 이벤트를 주기 위한 Ref
  const _pw = useRef()
  const _pwChk = useRef()

  // 비밀번호를 체크하기 위한 함수
  const checkPassWord = () => {
    if (!password_Reg.test(password)) {
      setMessagePassword(
        '(8~15자) 영문 대소문자/숫자/특수문자 모두 포함해야합니다!'
      )
      return
    }
    setMessagePassword('✔ 사용 가능한 비밀번호입니다!')
  }

  // 비밀번호 확인을 체크하기 위한 함수
  const doubleCheckPassWord = () => {
    if (password === '') {
      _pw.current.focus()
      setMessagePassword('비밀번호를 먼저 입력해주세요!')
    } else if (password !== '' && !pwCheck) setMessagePwCheck('')
    else if (password !== pwCheck || !password_Reg.test(password))
      setMessagePwCheck('비밀번호를 다시 확인해주세요!')
    else if (password === pwCheck && password_Reg.test(password))
      setMessagePwCheck('✔ 비밀번호가 확인되었습니다!')
  }

  // 비밀번호 변경을 위한 함수
  const changePw = async () => {
    if (password === '' || !password_Reg.test(password)) {
      _pw.current.focus()
      setMessagePassword(
        '(8~15자) 영문 대소문자/숫자/특수문자 모두 포함해야합니다!'
      )
      return
    } else if (pwCheck === '' || password !== pwCheck) {
      _pwChk.current.focus()
      setMessagePwCheck('비밀번호를 다시 확인해주세요!')
      return
    }
    await api
      .patch(
        '/users/security',
        {
          password,
        },
        {
          withCredentials: true,
          ContentType: 'application/json',
        }
      )
      .then((res) => {
        if (res.data.message !== '비밀번호 변경이 완료됐습니다') {
          setMessagePassword('이전 비밀번호 입니다.')
          setMessagePwCheck('비밀번호를 다시 확인해주세요!')
          setPassword('')
          setPwCheck('')
          Swal.fire({
            title: '이전 비밀번호와 일치합니다.',
            icon: 'warning',
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '확인',
            confirmButtonColor: '#e8b229',
          })
          return
        }
        Swal.fire({
          title: '비밀번호가 변경되었습니다.',
          icon: 'success',
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#e8b229',
        })
        history.push('/mypage')
      })
  }

  return (
    <Wrap>
      <PasswordArea>
        <PwText>새로운 비밀번호를 입력하세요.</PwText>
        <PwInput
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          ref={_pw}
          onBlur={checkPassWord}
        />
        <CheckText>{messagePassword}</CheckText>
      </PasswordArea>
      <PasswordArea>
        <PwText>비밀번호를 다시 입력해주세요.</PwText>
        <PwInput
          type="password"
          onChange={(e) => {
            setPwCheck(e.target.value)
          }}
          ref={_pwChk}
          onBlur={doubleCheckPassWord}
        />
        <CheckText>{messagePwCheck}</CheckText>
        <ChangeBtn onClick={changePw}> 변경 완료</ChangeBtn>
      </PasswordArea>
    </Wrap>
  )
}

const Wrap = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  width: 300px;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const PasswordArea = styled.div`
  margin: 20px 0;
  text-align: center;
`

const PwText = styled.h3`
  color: #616161;
  margin: 5px 0;
  width: 100%;
`

const PwInput = styled.input`
  width: 80%;
  margin: 5px 0 3px 0;
  padding: 3px;
  border: solid 2px #d2d2d2;
  border-radius: 5px;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
`

const CheckBtn = styled.button`
  margin-top: 6px;
  width: 80%;
  height: 20px;
  border: 0;
  color: white;
  border-radius: 10px;
  background-color: rgb(243, 200, 18);
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  :hover {
    font-weight: bold;
    background-color: rgb(249, 213, 54);
  }
`

const CheckText = styled.p`
  height: 20px;
  text-align: left;
  font-size: 10px;
  margin: 0 0 0 26px;
  color: rgb(255, 162, 0);
`

const ChangeBtn = styled.button`
  font-size: 17px;
  margin-top: 50px;
  width: 80%;
  height: 35px;
  border: 0;
  color: white;
  border-radius: 10px;
  background-color: rgb(162, 162, 162);
  box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.06);
  :hover {
    font-weight: bold;
    background-color: rgb(249, 213, 54);
  }
`

export default ChangePasswordComponent
