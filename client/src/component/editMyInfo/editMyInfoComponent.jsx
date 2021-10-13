import React, { useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'

import api from '../../api/index'
import { UserContext } from '../../context/userContext'

const EditMyInfoComponent = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { email, createdAt } = userInfo

  const [nickname, setNickname] = useState(userInfo.nickname)
  const [description, setDescription] = useState(userInfo.description)

  const [messageNickname, setMessageNickname] = useState('')
  const [messageDescription, setMessageDescription] = useState('')

  const _nick = useRef()
  const _des = useRef()


  const history = useHistory()

  // 닉네임 형식을 체크하는 정규 표현식
  const nickname_Reg = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/

  const checkNickname = async () => {
    if (!nickname_Reg.test(nickname) || nickname === '') {
      Swal.fire({
        title: '닉네임을 다시 정해주세요',
        text: '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리까지 가능합니다!',
        icon: 'warning',
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: '확인',
        confirmButtonColor: '#e8b229',
      })
      return
    }
    await api
      .post('users/signup/nick-check', {
        nickname: nickname,
      },{
        withCredentials: true
      })
      .then((res) => {
        setMessageNickname(res.data.message)
        if (res.data.message === '동일한 닉네임이 존재합니다!') {
          Swal.fire({
            title: '중복된 닉네임입니다.',
            icon: 'warning',
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '확인',
            confirmButtonColor: '#e8b229',
          })
          setNickname('')
          return
        }
      })
  }

const DesCheck = () => {
  if (description === '') {
    _des.current.focus()
    setMessageDescription('자기소개를 입력해주세요!')
    return
  }
}

  const editDone = async () => {
    if (nickname === '' || !nickname_Reg.test(nickname)) {
      _nick.current.focus()
      setMessageNickname(
        '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리까지 가능합니다!'
      )
      return
    }
    if (description === '') {
      _des.current.focus()
      setMessageDescription('자기소개를 입력해주세요!')
      return
    }
    await api
      .patch('/users', {
        nickname: nickname,
        description: description,
      }, {
        withCredentials: true
      })
      .then((res) => {
        let { id, email, createdAt } = res.data.userData
        setUserInfo({
          id,
          email,
          nickname,
          description,
          createdAt,
        })
        if (res.data.userData) {
          Swal.fire({
            title: '정보가 수정되었습니다.',
            icon: 'success',
            showCancelButton: false,
            focusConfirm: false,
            confirmButtonText: '확인',
            confirmButtonColor: '#e8b229',
          })
          history.push(`/info`)
        }
      })
  }

  return (
    <Wrap>
      <NameArea>
        <Name>새로운 닉네임</Name>
        <NameInput
          onChange={(e) => {
            setNickname(e.target.value)
          }}
          placeholder={nickname}
          ref={_nick}
          onBlur={checkNickname}
        />
        <CheckText>{messageNickname}</CheckText>
      </NameArea>
      <IntroArea>
        <Name>자기 소개</Name>
        <Textarea
          onChange={(e) => {
            setDescription(e.target.value)
          }}
          value={description}
          ref={_des}
          onBlur={DesCheck}
        />
        <CheckText>{messageDescription}</CheckText>
      </IntroArea>
      <BottomArea>
        <DateArea>
          <DateP>활동 시작일</DateP>
          <Data>{createdAt}</Data>
        </DateArea>
        <EmailArea>
          <EmailP>이메일</EmailP>
          <Data>{email}</Data>
        </EmailArea>
        <CheckBtn onClick={editDone}>수정 완료</CheckBtn>
      </BottomArea>
    </Wrap>
  )
}

const Wrap = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
  width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const NameArea = styled.div`
  text-align: center;
  padding-top: 10px;
`

const Name = styled.h3`
  margin: 5px 0;
  width: 100%;
  color: #616161;
`

const NameInput = styled.input`
  width: 60%;
  margin: 5px auto 0 auto;
  padding: 3px;
  font-size: 11px;
  border: solid 2px #d2d2d2;
  border-radius: 5px;
  :focus {
    border: 2px solid rgb(243, 200, 18);
    outline: none;
  }
`

const CheckBtn = styled.button`
  margin-top: 10px;
  width: 60%;
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

const IntroArea = styled.div`
  margin: 15px 0;
  text-align: center;
`

const Textarea = styled.textarea`
  resize: none;
  width: 95%;
  height: 130px;
  padding: 10px;
  border: solid 2px #d2d2d2;
  border-radius: 5px;
  box-sizing: border-box;
  :focus {
    border: 2px solid rgb(243, 200, 18);
    outline: none;
  }
`
const CheckText = styled.div`
  height: 3px;
  text-align: center;
  font-size: 11px;
  margin-left: 5px;
  margin-top: 3px;
  color: rgb(255, 162, 0);
`

const DateArea = styled.div`
  text-align: center;
  margin-top: 10px;
`

const DateP = styled.h4`
  margin: 3px 0;
  color: #616161;
`

const EmailP = styled.h4`
  margin: 3px 0;
  color: #616161;
`

const Data = styled.p`
  margin: 0 auto;
  border: solid 2px #d2d2d2;
  border-radius: 3px;
  width: 80%;
`

const EmailArea = styled.div`
  margin-top: 10px;
  text-align: center;
`

const BottomArea = styled.div`
  text-align: center;
`

export default EditMyInfoComponent
