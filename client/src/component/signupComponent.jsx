import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import api from '../api'

const SignupComponent = () => {
  const history = useHistory()

  // 회원가입 데이터
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const [nickname, setNickname] = useState('')
  const [description, setDescription] = useState('')

  // 에러 메시지 표기
  const [messageEmail, setMessageEmail] = useState('')
  const [messagePassword, setMessagePassword] = useState('')
  const [messagePwCheck, setMessagePwCheck] = useState('')
  const [messageNickname, setMessageNickname] = useState('')
  const [messageDescription, setMessageDescription] = useState('')

  // focus 이벤트를 주기 위한 Ref
  const _email = useRef()
  const _pw = useRef()
  const _pwChk = useRef()
  const _nick = useRef()
  const _des = useRef()

  // 이메일, 비밀번호, 닉네임 형식을 체크하는 정규 표현식
  const email_Reg =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  const password_Reg =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/
  const nickname_Reg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

  // (axios) 이미 등록된 이메일인지 체크
  const checkEmail = async () => {
    if (!email_Reg.test(email)) {
      setMessageEmail('이메일 형식에 맞게 작성해 주시기 바랍니다!')
      return
    } else {
      await api
        .post('/users/signup/mail-check', { email })
        .then((res) => setMessageEmail(res.data.message))
    }
  }

  // 비밀번호 체크
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

  // (axios) 이미 등록된 닉네임인지 체크
  const checkNickname = async () => {
    if (!nickname_Reg.test(nickname)) {
      setMessageNickname(
        '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리까지 가능합니다!'
      )
      return
    } else {
      await api
        .post('/users/signup/nick-check', { nickname })
        .then((res) => setMessageNickname(res.data.message))
    }
  }

  // 회원가입 버튼
  const signUp = async (event) => {
    if (email === '' || !email_Reg.test(email)) {
      _email.current.focus()
      setMessageEmail('이메일 형식에 맞게 작성해 주시기 바랍니다!')
      return
    } else if (password === '' || !password_Reg.test(password)) {
      _pw.current.focus()
      setMessagePassword(
        '(8~15자) 영문 대소문자/숫자/특수문자 모두 포함해야합니다!'
      )
      return
    } else if (pwCheck === '') {
      _pwChk.current.focus()
      setMessagePwCheck('비밀번호를 한번 더 입력해주세요!')
      return
    } else if (nickname === '' || !nickname_Reg.test(nickname)) {
      _nick.current.focus()
      setMessageNickname('닉네임을 확인해주세요!')
      return
    } else if (description === '') {
      _des.current.focus()
      setMessageDescription('자기소개를 입력해주세요!')
      return
    }
    event.preventDefault()

    await api.post(
      '/users/signup',
      {
        email,
        password,
        nickname,
        description,
      },
      {
        ContentType: 'application/json',
      }
    )

    Swal.fire({
      title: '회원가입이 완료되었습니다.',
      text: '모든 레시피를 확인해보세요!',
      confirmButtonColor: '#d6d6d6',
      confirmButtonText: '확인',
    })
    history.push('/')
  }

  return (
    <Wrapper>
      <TitleArea>
        <Title>Pick & Roll</Title>
        <MainText>
          회원가입 후 맛과 간편성 모두 잡은 레시피들을 확인해보세요
        </MainText>
      </TitleArea>
      <Form>
        <FormGroup>
          <Labal>
            이메일
            <span className="require">*</span>
          </Labal>
          <Input
            type="text"
            placeholder="이메일을 입력해주세요"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            ref={_email}
            onBlur={checkEmail}
          />
          <CheckText>{messageEmail}</CheckText>
        </FormGroup>
        <FormGroup>
          <Labal>
            비밀번호
            <span className="require">*</span>
          </Labal>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            onBlur={checkPassWord}
            ref={_pw}
          />
          <CheckText>{messagePassword}</CheckText>
        </FormGroup>
        <FormGroup>
          <Labal>
            비밀번호 확인
            <span className="require">*</span>
          </Labal>
          <Input
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={(e) => {
              setPwCheck(e.target.value)
            }}
            ref={_pwChk}
            onBlur={doubleCheckPassWord}
          />
          <CheckText>{messagePwCheck}</CheckText>
        </FormGroup>
        <FormGroup>
          <Labal>
            닉네임
            <span className="require">*</span>
          </Labal>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            onChange={(e) => {
              setNickname(e.target.value)
            }}
            ref={_nick}
            onBlur={checkNickname}
          />
          <CheckText>{messageNickname}</CheckText>
        </FormGroup>
        <FormGroup>
          <Labal>
            자기소개
            <span className="require">*</span>
          </Labal>
          <Textarea
            placeholder="ex) 김치찌개와 계란말이를 좋아합니다"
            onChange={(e) => {
              setDescription(e.target.value)
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                signUp(event)
              }
            }}
            ref={_des}
          ></Textarea>
          <CheckText>{messageDescription}</CheckText>
        </FormGroup>
        <FormGroup>
          <SignupBtn onClick={signUp}>회원가입</SignupBtn>
        </FormGroup>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom : 100px;
  top: 70px;
`

const TitleArea = styled.div`
  width: 360px;
  margin: 50px 0px 30px 0px;
  font-size: 30px;
`

const Title = styled.p`
  width: 360px;
  height: 42px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: rgb(77, 77, 77);
`

const MainText = styled.div`
  text-align: center;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 10px;
  color: rgb(255, 162, 0);
`

const Form = styled.div`
  width: 500px;
  height: 620px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 0px;
`

const FormGroup = styled.div`
  margin-top: 15px;
  text-align: center;
`

const CheckText = styled.div`
  height: 3px;
  text-align: left;
  font-size: 11px;
  margin-left: 5px;
  margin-top: 3px;
  color: rgb(255, 162, 0);
`

const Labal = styled.div`
  text-align: left;
  margin-left: 4px;
  margin-bottom: 3px;
  .require {
    color: rgb(255, 162, 0);
    margin-left: 4px;
    line-height: 2;
  }
`

const Input = styled.input`
  width: 300px;
  height: 15px;
  align-items: center;
  padding: 15px 50px 10px 10px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
  }
`

const Textarea = styled.textarea`
  width: 341px;
  height: 70px;
  align-items: center;
  padding: 5px 10px 10px 10px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  resize: none;
  margin-bottom: -5px;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 13px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
  }
`

const SignupBtn = styled.button`
  width: 366px;
  text-align: center;
  align-items: center;
  padding: 0px 0px;
  margin-top: 15px;
  background-color: rgb(243, 200, 18);
  height: 50px;
  border: 1px solid transparent;
  border-radius: 13px;
  color: white;
  font-size: 17px;
`

export default SignupComponent
