import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaKey, FaCog } from 'react-icons/fa'
import { UserContext } from '../../context/userContext'
import ShowInfoComponent from '../editMyInfo/showInfoComponent'
import EditMyInfoComponent from '../editMyInfo/editMyInfoComponent'
import ChangePasswordComponent from '../editMyInfo/changePasswordComponent'
import PasswordModal from '../modal/passwordModal'
import api from '../../api/index'

const MyInfoComponent = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)

  const [page, setPage] = useState('showInfo')
  const [pwModal, setPwModal] = useState(false)

  const changeInfo = () => setPage('showInfo')
  const changeEdit = () => setPage('EditInfo')

  //(axios) get 요청으로 토큰, 데이터 업데이트
  const updateUser = async () => {
    await api
      .get('/users', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.accessToken) {
          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${res.data.accessToken}`
        }
        let { id, email, nickname, description, createdAt } = res.data.userData
        createdAt = createdAt.substring(0, 10)

        let user = { id, email, nickname, description, createdAt }
        setUserInfo(user)
      })
  }

  useEffect(() => {
    updateUser()
  }, [])

  return (
    <Contents>
      <TitleWrap>
        <Title onClick={changeInfo}>나의 정보</Title>
      </TitleWrap>
      <Info>
        {(() => {
          switch (page) {
            case 'showInfo':
              return <ShowInfoComponent userInfo={userInfo} />
            case 'EditInfo':
              return <EditMyInfoComponent userInfo={userInfo} />
            case 'changePassword':
              return <ChangePasswordComponent />
            default:
          }
        })()}
        <BtnWrap>
          <ReviseForm>
            <ReviseBtn>
              <ReviseText className="fixed">사용자정보 수정</ReviseText>
              <FaCog onClick={changeEdit} />
            </ReviseBtn>
          </ReviseForm>
          <ReviseForm>
            <ReviseBtn>
              <FaKey onClick={() => setPwModal(!pwModal)} />
            </ReviseBtn>
            {pwModal ? (
              <PasswordModal
                pwModal={pwModal}
                setPage={setPage}
                setPwModal={setPwModal}
              />
            ) : null}
            <ReviseText className="fixed">비밀번호 수정</ReviseText>
          </ReviseForm>
        </BtnWrap>
      </Info>
    </Contents>
  )
}

const Contents = styled.div`
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-bottom: 200px;
`

const TitleWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  width: 200px;
  align-items: center;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 5px 300px;
  font-size: 20px;
  font-weight: 900;
  height: 30px;
  padding-top: 6px;
  color: #4f4f4f;
`

const Info = styled.div`
  height: 450px;
  width: 600px;
  margin: 30px auto;
  display: flex;
  box-shadow: 0px 1px 10px 1px rgb(201, 201, 201);
  @media (max-width: 1200px) {
    position: relative;
    width: 90%;
    height: 500px;
    padding: 0;
    box-sizing: border-box;
  }
`

const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  position: absolute;
  margin-left: 445px;
  @media (max-width: 1200px) {
    padding: 2px 10px 0 0;
    top: 20px;
    right: 1px;
    height: 80px;
  }
`

const ReviseForm = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: row-reverse;
  :hover .fixed {
    display: block;
  }
  @media (max-width: 1200px) {
    width: 140px;
    margin-top: 7px;
  }
`

const ReviseBtn = styled.div`
  display: flex;
  font-size: 20px;
  :hover {
    color: rgb(243, 200, 18);
  }
  @media (max-width: 1200px) {
    margin-right: 10px;
  }
`

const ReviseText = styled.div`
  font-size: 11px;
  margin-right: 10px;
  margin-top: 1px;
  display: none;
  color: rgb(243, 200, 18);
`

export default MyInfoComponent
