import React, { useState, useContext, useRef } from 'react'
import styled from 'styled-components'

import api from '../../api'
import { UserContext } from '../../context/userContext'

const CommentListComponent = ({ recipesId, comment }) => {
  const [content, setContent] = useState(comment.content)
  const [page, setPage] = useState('list')
  const _content = useRef()
  const { userInfo, setUserInfo } = useContext(UserContext)

  const changeForm = () => {
    setPage('edit')
  }
  const updateComment = async () => {
    await api.patch(`/recipes/${recipesId}/comment/${comment.id}`, {
      content
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => {
      setPage('list')
      window.location.reload()
    })
  }

  const deleteComment = async () => {
    await api.delete(`/recipes/${recipesId}/comment/${comment.id}`, {
      withCredentials: true
    })
    .then((res) => window.location.reload())
  }

  return (
    <CommentBox>
      <WriteWrapper>
        <SpaceWrapper>
          <Nickname>{comment.nickname}</Nickname>
          <CreatedAt>{comment.createdAt.substring(0, 10)}</CreatedAt>
        </SpaceWrapper>
        { 
          userInfo.id === comment.userId ? (
          <SpaceWrapper>
            <UdBtn onClick={changeForm}>수정</UdBtn>
            <UdBtn onClick={() => deleteComment(comment.id)}>삭제</UdBtn>
          </SpaceWrapper> ) : null 
        }
      </WriteWrapper>
      {
        page === 'list' ? (
          <Content>{comment.content}</Content>
        ) : (
          <span>
            <Input type="text" value={content} ref={_content} onChange={(e) => {
              setContent(e.target.value)
            }} />
            <UBtn onClick={updateComment}>댓글 수정</UBtn>
          </span>
        )
      }
      
    </CommentBox>
  )
}

const CommentBox = styled.div`
  border-top: solid 1px #d4d4d4;
  padding: 20px 0 50px 10px;
`

const WriteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const SpaceWrapper = styled.span`
  margin: 0 10px 0 0;
`

const Nickname = styled.span`
  font-size: 20px;
  margin: 0 10px 0 0;
`

const Content = styled.div`
  margin: 10px 0 0 0;
`

const CreatedAt = styled.span`
  color: #b5b5b5;
  font-size: 15px;
`

const UdBtn = styled.span`
  margin: 0 5px 0 5px;
  color: #b5b5b5;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

const Input = styled.input`
  width: 70%;
  height: 30px;
  border: solid 1px #d2d2d2;
  margin: 5px 0 0 0;
  border-radius: 5px;
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

const UBtn = styled.button`
  width: 80px;
  text-align: center;
  align-items: center;
  background-color: rgb(243, 200, 18);
  margin: 0 0 0 5px;
  height: 30px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  font-size: 15px;
`
export default CommentListComponent
