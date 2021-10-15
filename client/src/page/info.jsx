import React from 'react'
import styled from 'styled-components'
import InfoComponent from '../component/info'

const Info = () => {
  const data1 = {
    id: 'intro',
    bgColor: true,
    headText: 'Pick & Roll',
    title: '환영합니다 !',
    description: ['즐거운 식사 . 근사한 식탁 . 행복한 요리 .', '소중한 한 끼를 선물합니다', 'Pick & Roll 올림'],
    imgFirst: true,
    img: require('../component/info/dish.svg'),
    alt: 'Eat'
  }

  const data2 = {
    id: 'recipe',
    bgColor: false,
    headText: 'Recipe for you',
    title: '뭐 먹을래?',
    description: ['요리를 하기 위해 여러 레시피를 비교해 보신 적이 있나요?', '맛보단 간편성이 우선인 레시피를 찾고 싶진 않으신가요?', '많은 사람이 선택한 레시피들을 고르고 따라 요리해 보세요.'],
    imgFirst: false,
    img: require('../component/info/eatting.svg'),
    alt: 'Cook',
    btnLabel: '레시피 확인'
  }

  return (
    <Wrapper>
      <InfoComponent data={data1}></InfoComponent>
      <InfoComponent data={data2}></InfoComponent>
    </Wrapper>
  )
}

const Wrapper = styled.div`
margin-bottom : 200px;
`
export default Info
