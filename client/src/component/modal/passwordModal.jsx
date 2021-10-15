import React, { useState, useContext, useRef } from 'react'
import styled from 'styled-components'
import { FaRegTimesCircle } from 'react-icons/fa'
import Swal from 'sweetalert2'
import api from '../../api/index'

const PasswordModal = ({ pwModal, setPwModal, setPage }) => {
  const [password, setPassword] = useState('')
  const [checkPwMessage, setCheckPwMessage] = useState('')

  const checkPw = async () => {
    await api
      .post('/users/security', { password }, { 
        headers : { 
          'Content-Type': 'application/json' 
        }, 
        withCredentials: true })
      .then((res) => {
        Swal.fire({
          title: '비밀번호가 확인되었습니다.',
          icon: 'success',
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: '확인',
          confirmButtonColor: '#e8b229',
        })
        setPwModal(false)
        setPage('changePassword')
      })
      .catch((res) => {
        setCheckPwMessage('비밀번호가 일치하지 않습니다!')
      })
  }

  return (
    <Modal>
      <Left onClick={() => setPwModal(!pwModal)} />
      <Form>
        <Wrapper>
          <CheckIcon>
            <FaRegTimesCircle onClick={() => setPwModal(!pwModal)} />
          </CheckIcon>
          <Pwcheck>현재 비밀번호</Pwcheck>
          <PwcheckC>
            <Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></Input>
            <CheckText>{checkPwMessage}</CheckText>
            <CheckBtn
              onClick={() => {
                checkPw()
              }}
            >
              확인
            </CheckBtn>
          </PwcheckC>
        </Wrapper>
      </Form>
      <Right onClick={() => setPwModal(!pwModal)} />
    </Modal>
  )
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
`

const Left = styled.div`
  width: 35%;
`

const Right = styled.div`
  width: 35%;
`

const Form = styled.div`
  width: auto;
  padding-top: 200px;
  margin-bottom: 180px;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  width: 450px;
  height: 200px;
  background: white;
  border-radius: 30px;
`

const PwcheckC = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px auto;
  align-items: center;
`

const Pwcheck = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
  margin-top: 30px;
`

const CheckText = styled.p`
  height: 20px;
  text-align: left;
  font-size: 13px;
  margin: 0;
  color: rgb(255, 162, 0);
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

const CheckBtn = styled.button`
  width: 70px;
  height: 30px;
  text-align: center;
  align-items: center;
  padding: 0;
  margin-top: 15px;
  background-color: rgb(243, 200, 18);
  border: 1px solid transparent;
  border-radius: 13px;
  color: white;
  font-size: 17px;
`

const CheckIcon = styled.div`
  position: absolute;
  margin-left: 410px;
  margin-top: 15px;
  color: #6f6f6f;
  :hover {
    cursor: pointer;
  }
`

export default PasswordModal
