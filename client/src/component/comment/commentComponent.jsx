import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import api from '../../api'
import CommentListComponent from './commentListComponent'

const CommentComponent = ({ recipesId, comments }) => {
  const [content, setContent] = useState('')
  const _content = useRef()

  const writeComment = async () => {
    await api.post(`/recipes/${recipesId}/comment`, {
      content
    }, {
      headers : {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => window.location.reload())
  }

  return (
    <Wrapper>
        {`${comments && comments.length}개의 댓글`}
        <WriteWrapper>
          <Input type="text" placeholder="댓글을 작성하세요" ref={_content} onChange={(e) => { 
            setContent(e.target.value)
          }} />
          <SubmitBtn onClick={writeComment}>댓글 작성</SubmitBtn>
        </WriteWrapper>
      <div className= 'content'>
        { 
          comments && comments.map((comment) => {
            return (
              <CommentListComponent recipesId={recipesId} comment={comment} />
            )
          })
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
`

const WriteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: solid 2px #d2d2d2;
  margin: 10px 0 50px 0;
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

const SubmitBtn = styled.button`
  width:90px;
  text-align: center;
  align-items: center;
  background-color: rgb(243, 200, 18);
  margin: 10px 0 0 5px;
  height: 55px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: white;
  font-size: 17px;
`

export default CommentComponent
