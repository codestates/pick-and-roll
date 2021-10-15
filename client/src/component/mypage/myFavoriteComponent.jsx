import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import api from '../../api/index'
import ImageComponent from '../imageComponent'

const MyFavoriteComponent = () => {
  const [infos, setInfos] = useState([])
  const [favoriteeMessage, setFavoriteeMessage] = useState('')
  const [favorite, setFavorite] = useState(true)

  const showFavorite = async () => {
    await api
      .get('/users/favorite', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message !== '즐겨찾기 레시피가 없습니다!') {
          setInfos([...res.data])
          setFavorite(true)
          return
        }
        setFavoriteeMessage('레시피를 즐겨찾기 하세요!')
        setFavorite(false)
      })
  }

  useEffect(() => {
    showFavorite()
  }, [])

  return (
    <Contents>
      <TitleWrap>
        <Title>즐겨찾기</Title>
      </TitleWrap>
      {favorite ? (
        <WrapperImage>
          {infos.map((image) => (
            <div className="img-wrapper" key={image.id}>
              <ImageComponent url={image.mainImg} info={image} />
            </div>
          ))}
        </WrapperImage>
      ) : (
        <TitleWrap>
          <Title className="message">{favoriteeMessage}</Title>
        </TitleWrap>
      )}
    </Contents>
  )
}

const Contents = styled.div`
  flex-direction: column;
  margin: 0;
  padding: 0;
  margin-bottom: 200px;
  min-height: 50vw;
`

const TitleWrap = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  .message {
    margin-top: 150px;
    font-size: 14px;
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

export default MyFavoriteComponent
