import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../../api/index'
import ImageComponent from '../imageComponent'

const MyRecipeComponent = () => {
  const [infos, setInfos] = useState([])
  const [recipeMessage, setRecipeMessage] = useState('')
  const [myRecipe, setMyRecipe] = useState(true)

  const showMyRecipe = async () => {
    await api
      .get('/users/myrecipe', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data !== '작성한 레시피가 없습니다!') {
          setInfos([...res.data])
          setMyRecipe(true)
          return
        }
        setRecipeMessage('자기만의 레시피를 작성해보세요!')
        setMyRecipe(false)
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
      {myRecipe ? (
        <WrapperImage>
          {infos.map((image) => (
            <div className="img-wrapper" key={image.id}>
              <ImageComponent url={image.mainImg} info={image} />
            </div>
          ))}
        </WrapperImage>
      ) : (
        <TitleWrap>
          <Title className='message'>{recipeMessage}</Title>
        </TitleWrap>
      )}
    </Contents>
  )
}

const Contents = styled.div`
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-bottom : 300px;
  min-height: 50vw;
`

const TitleWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .message {
      margin-top : 150px;
      font-size : 14px;
    }
`

const Title = styled.p`
  width: 200px;
  align-items: center;
  text-align: center;
  margin: 10px 87px 10px 0px;
  font-size: 20px;
  font-weight: 900;
  height: 30px;
  padding-top: 6px;
  color: #4f4f4f;
`

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 35px auto;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 300px;
  .img-wrapper {
    object-fit: cover;
    border-radius: 25%;
    cursor: pointer;
  }
`

export default MyRecipeComponent
