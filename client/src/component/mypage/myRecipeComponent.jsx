import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../../api/index'

const MyRecipeComponent = () => {
  const [myRecipe, setMyRecipe] = useState('')

  const showMyRecipe = async () => {
    await api
      .get('/users/myrecipe', { 
          headers : { 
            'Content-Type': 'application/json' 
          }, 
          withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data)
        // let { id, email, nickname, description, createdAt } = res.data
        // createdAt = createdAt.substring(0, 10)
        // let user = { id, email, nickname, description, createdAt }
      })
  }

  useEffect(() => {
    showMyRecipe()
  }, [])

  return (
    <Contents>
      <TitleWrap>
        <Title>나의 레시피</Title>
      </TitleWrap>
    </Contents>
  )
}

const Contents = styled.div`
  flex-direction: column;
  margin: 0;
  padding: 0;
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

export default MyRecipeComponent
