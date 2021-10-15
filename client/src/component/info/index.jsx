import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const InfoComponent = ({ data }) => {
  const history = useHistory()

  const move = () => {
    history.push('/recipe')
  }
  return (
    <>
      <Container id={data.id} bgColor={data.bgColor}>
        <Wrapper>
          <Row imgFirst={data.imgFirst}>
            <Column1 imgFirst={data.imgFirst}>
              <TextWrapper>
                <TopLine>{data.headText}</TopLine>
                <Heading>{data.title}</Heading>
                {
                  data.description && data.description.map((el) => {
                    return <SubTitle>{el}</SubTitle>
                  })
                }
                { data.btnLabel ? 
                  <BtnWrap>
                    <Button onClick={move}>{data.btnLabel}</Button>
                  </BtnWrap> : null
                }
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={data.img.default} alt={data.alt} />
              </ImgWrap>
            </Column2>
          </Row>
        </Wrapper>
      </Container>
    </>
  )
}

const Container = styled.div`
  background: ${({ bgColor}) => (bgColor ? '#f4f4ec' : '#ffffff')};
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`

const Wrapper = styled.div`
  display: grid;
  height: 550px;
  width: 100%;
  max-width: 1100px;
  margin-top: 80px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  z-index: 1;
  justify-content: center;
`

const Row = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgFirst }) => (imgFirst ? `'col2 col1'` : `'col1 col2'`)};

  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgFirst }) => (imgFirst ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`)};
  }
`

const Column1 = styled.div`
  margin-bottom: 15px;
  text-align: ${({ imgFirst }) => (imgFirst ? 'left' : 'right')};
  padding: 0 15px;
  grid-area: col1;
`

const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`

const TextWrapper = styled.div`
  max-width: 540px;
  padding-top : 0;
  padding-bottom: 60px;
`

const TopLine = styled.p`
  color: #c4cb3c;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`

const Heading = styled.h1`
  margin-bottom: 30px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;

  @media screen and (max-width: 480px){
    font-size: 32px;
  }
`

const SubTitle = styled.p`
  color: #1d1b1b;
  max-width: 510px;
  margin-bottom: 3px;
  font-size: 18px;
  line-height: 24px;
`

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right : 11px;
`

const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`

const Img = styled.img`
  width: 100%;
  margin: 0 0 10px 0;
  padding-right: 0;
`

const Button = styled.button`
  margin-top: 30px;
  width: 30%;
  text-align: center;
  background-color: rgb(243, 200, 18);
  height: 50px;
  border: 1px solid transparent;
  border-radius: 13px;
  color: white;
  font-size: 20px;
  font-weight: bold;
`

export default InfoComponent
