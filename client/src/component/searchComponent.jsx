import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { SearchValueContext } from '../context/searchValueContext'
import ImageComponent from './imageComponent'
import api from '../api'

const SearchComponent = () => {
  const { isValue, setIsValue } = useContext(SearchValueContext)
  const [infos, setInfos] = useState([])
  const [offset, setOffset] = useState(1)
  const [moreViewMessage, setMoreViewMessage] = useState('더보기')

  const handleChangeOffset = async () => {
    let offsetNum = offset + 1
    setOffset(offsetNum)
  }

  const paginationImages = async () => {
    await api
    .get(
      `/recipes??searchName=${isValue}&offset=${offset}&limit=8`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      if(res.data.length !== 0) {
        if(res.data.length < 8) {
          setMoreViewMessage('fin.')
          setInfos([...infos, ...res.data])            
        } else { 
          setInfos([...infos, ...res.data])
        }
      } else if (res.data.length === 0) {
        setMoreViewMessage('fin.')        
      }
    })
  }
  
  const fetchImages = async () => {
    await api
      .get(`/recipes?searchName=${isValue}&offset=${offset}&limit=8`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      .then((res) => {
        setInfos([...res.data])
      })
  }

  useEffect(() => {
    paginationImages()
  }, [offset])

  useEffect(() => {
    fetchImages()
  }, [isValue])

  return (
    <>
      <Header>
        <h3>
          {isValue} &nbsp;&nbsp;검색 결과 &nbsp;&nbsp;&nbsp; {infos.length} 개
        </h3>
      </Header>
      <Wrapper>        
          <WrapperImage>
            {infos.map((image) => (
              <div className="img-wrapper" key={image.id}>
                <ImageComponent url={image.mainImg} info={image} />
              </div>
            ))}
          </WrapperImage>
          <TextWrap>
          <Pagination className="show" onClick={handleChangeOffset}>
            {moreViewMessage}
          </Pagination>
          <PaWrap className="icon">
            <FaAngleDoubleDown />
          </PaWrap>
        </TextWrap>    
      </Wrapper>
    </>
  )
}

const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  :hover {
    .show {
      color: #858585;
      font-weight: bold;
    }
    .icon {
      color: white;
      z-index: -1;
    }
  }
`

const PaWrap = styled.div`
  font-size: 30px;
  position: absolute;
  left: 50%;
  color: #e68e23;
`

const Pagination = styled.div`
  font-size: 15px;
  position: absolute;
  left: 50%;
  color: white;
  text-align: center;
  align-items: center;
`

const Header = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-bottom : 150px;
  min-height: 40vh;
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

export default SearchComponent
