import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../../api/index'
import ImageComponent from '../imageComponent'

const MyRecipeComponent = () => {
  const [infos, setInfos] = useState([])

  const showMyRecipe = async () => {
    await api
      .get('/users/myrecipe', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message !== '작성한 레시피가 없습니다!') {
        setInfos([...res.data])
        }
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
        <WrapperImage>
          {infos.map((image) => (
            <div className="img-wrapper" key={image.id}>
              <ImageComponent info={image} />
            </div>
          ))}
        </WrapperImage>
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

const WrapperImage = styled.section`
  max-width: 70rem;
  margin: 3rem 7rem;
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
