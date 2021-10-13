import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import Swal from 'sweetalert2'

import api from '../api'
import { AddListingredients } from './write/addListComponent'
import DropDownCategory from './write/dropDownComponent'
import ContentImgComponent from './ImgEncoding/contentImgsComponent'
import MainImgComponent from './ImgEncoding/mainImgComponent'

const UpdateComponent = () => {
  const history = useHistory()
  const recipeId = history.location.pathname.split('=')[1]

  const [title, setTitle] = useState('')
  const [introduction, setIntroduction] = useState('')
  const [category, setCategory] = useState('')
  const [requiredTime, setRequiredTime] = useState('')
  const [contents, setContents] = useState([''])
  const [mainImg, setMainImg] = useState('')
  const [contentImgs, setContentImgs] = useState([])
  const [ingredients, setIngredients] = useState([
    {
      ingredient: '',
      amount: '',
    },
  ])
  const [messageTitle, setMessageTitle] = useState('')
  const [messageIntroduction, setMessageIntroduction] = useState('')
  const [messageCategory, setMessageCategory] = useState('')
  const [messageRequiredTime, setMessageRequiredTime] = useState('')
  const [messageContents, setMessageContents] = useState('')
  const [messageMainImg, setMessageMainImg] = useState('')
  const [messageContentImgs, setMessageContentImgs] = useState('')
  const [messageIngredients, setMessageIngredients] = useState('')

  // focus 이벤트를 주기 위한 Ref
  const _title = useRef()
  const _introduction = useRef()
  const _category = useRef()
  const _requiredTime = useRef()
  const _contents = useRef()
  const _mainImg = useRef()
  const _contentImgs = useRef()
  const _ingredients = useRef()

  const getRecipeInfo = async () => {
    await api.get(`/recipes?id=${recipeId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => {
      const info = res.data.recipeData
      setTitle(info.title)
      setIntroduction(info.introduction)
      setMainImg(info.mainImg)
      setCategory(info.category)
      setContents(info.content)
      setRequiredTime(info.requiredTime)
      let ingredient = info.ingredients.map((el) => {
        return {
          ingredient: el[0],
          amount: el[1]
        }
      })
      setIngredients(ingredient)
      setContentImgs(info.contentImg)
    })
  }

  useEffect(() => {
    getRecipeInfo()
  }, [])

  const addList = () => {
    setContents([...contents, ''])
  }

  const deletList = () => {
    setContents(contents.slice(0, -1))
  }

  const onChangeContent = useCallback((event, idx) => {
    if (!/[@!#$%^&*()]/g.test(event)) {
      const newContent = contents.slice()
      newContent[idx] = event
      setContents(newContent)
    } else {
      setMessageContents('특수문자를 사용하실 수 없습니다.')
    }
  })

  const updateInfoSubmit = async (event) => {
    if (title === '') {
      _title.current.focus()
      setMessageTitle('title을 입력해주세요')
      return
    } else if (category === '') {
      _category.current.focus()
      setMessageCategory('카테고리를 입력해주세요!')
      return
    } else if (introduction === '') {
      _introduction.current.focus()
      setMessageIntroduction('음식 소개를 입력해주세요!')
      return
    } else if (requiredTime === '') {
      _requiredTime.current.focus()
      setMessageRequiredTime('소요시간을 입력해주세요!')
      return
    } else if (contents[0] === '') {
      _contents.current.focus()
      setMessageContents('요리 방법을 입력해주세요!')
      return
    } else if (mainImg.length <= 0) {
      _mainImg.current.focus()
      setMessageMainImg('메인 이미지를 등록해주세요!')
      return
    } else if (contentImgs.length <= 0) {
      _contentImgs.current.focus()
      setMessageContentImgs('요리 방법에 대한 사진을 등록해주세요!')
      return
    } else if (ingredients[0].ingredient === '') {
      _ingredients.current.focus()
      setMessageIngredients('재료를 입력해주세요!')
      return
    }
    //preventDefault는 창이 새로 고침되는 것을 막기 위해서
    event.preventDefault()

    let content = contents.join('@')
    // regex
    let ingred = ingredients.map(
      (el) => `${el.ingredient},${el.amount}`
    )
    let finalIngredients = ingred.join('@')

    await api.patch(
      `/recipes/${recipeId}`,
      {
        title: title,
        introduction: introduction,
        category: category,
        requiredTime: requiredTime,
        content: content,
        mainImg: mainImg,
        contentImg: contentImgs.join(','),
        ingredients: finalIngredients
      },
      {
        'Content-Type': 'application/json',
        withCredentials: true
      }
    )

    Swal.fire({
      title: '레시피 등록이 완료되었습니다.',
      text: '레시피를 확인해보세요!',
      confirmButtonColor: '#d6d6d6',
      confirmButtonText: '확인',
    })
    history.push('/')
  }

  return (
    <>
      <Wrapper>
        <TitleArea>
          <Title>레시피 작성</Title>
          <MainText> 본인 만의 노하우가 담긴 비법을 전수해주세요. </MainText>
        </TitleArea>
        <Form>
          <FormGroup>
            <Labal>
              제목 <span className="require">*</span>
            </Labal>
            <Input
              className="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              ref={_title}
            />
            <CheckText>{messageTitle}</CheckText>
          </FormGroup>
          <FormGroup>
            <Labal>
              요리소개 <span className="require">*</span>
            </Labal>
            <Textarea
              type="text"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              ref={_introduction}
            />
            <CheckText>{messageIntroduction}</CheckText>
          </FormGroup>
          <FormGroup>
            <Labal>
              메인 사진<span className="require">*</span>
            </Labal>
            <MainImgComponent
              className="imgBox"
              mainImg={mainImg}
              setMainImg={setMainImg}
              mainImgRef={_mainImg}
            />
            <CheckText>{messageMainImg}</CheckText>
          </FormGroup>
          <BoxWrap>
            <BoxGroup>
              <Labal>
                카테고리 <span className="require">*</span>
              </Labal>
              <DropDownCategory
                category={category}
                setCategory={setCategory}
                categoryRef={_category}
              />
              <CheckText>{messageCategory}</CheckText>
            </BoxGroup>
            <BoxGroup>
              <Labal>
                조리시간 <span className="require">*</span>
              </Labal>
              <TimeWrapper>
                <input
                  type="text"
                  placeholder="조리시간"
                  value={requiredTime}
                  onChange={(e) => setRequiredTime(e.target.value)}
                  ref={_requiredTime}
                />
              </TimeWrapper>
            </BoxGroup>
          </BoxWrap>
          <FormGroup>
            <Labal>
            <div className='center'>요리 재료 <span className="require">*</span></div>
            </Labal>
            <AddListingredients
              ingredients={ingredients}
              setIngredients={setIngredients}
              ingredientsRef={_ingredients}
              setMessageIngredients={setMessageIngredients}
            />
            <CheckText>{messageIngredients}</CheckText>
          </FormGroup>
          <FormGroup>
            <Labal>
            <div className='center'>요리 방법 <span className="require">*</span></div>
            </Labal>
            <CookWrapper>
              {contents.map((content, idx) => (
                <InlineBox key={idx}>
                  <div className="number">{idx + 1}.</div>
                  <CookTextarea
                    type="text"
                    onChange={(e) => {
                      onChangeContent(e.target.value, idx)
                    }}
                    value={content}
                    ref={_contents}
                  />
                </InlineBox>
              ))}
              <ClickWrap>
                <ClickBtn className="button" onClick={addList}>
                  항목 추가
                </ClickBtn>
                <ClickBtn className="button" onClick={deletList}>
                  항목 제거
                </ClickBtn>
              </ClickWrap>
            </CookWrapper>
            <CheckText>{messageContents}</CheckText>
          </FormGroup>
          <FormGroup>
            <Labal>
              요리 사진 <span className="require">*</span>
            </Labal>
            <ContentImgComponent
              contentImgs={contentImgs}
              setContentImgs={setContentImgs}
              contentImgsRef={_contentImgs}
            ></ContentImgComponent>
            <CheckText>{messageContentImgs}</CheckText>
          </FormGroup>
          <FormGroup>
            <Enroll onClick={(e) => updateInfoSubmit(e)}>수정하기</Enroll>
          </FormGroup>
        </Form>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  align-items: center;
`

const TitleArea = styled.div`
  width: 360px;
  margin: 50px auto 30px;
  font-size: 30px;
`

const Title = styled.div`
  width: 360px;
  height: 42px;
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  color: rgb(77, 77, 77);
`

const MainText = styled.div`
  text-align: center;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 10px;
  color: rgb(255, 162, 0);
`

const Form = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 25px 0px;
  @media (max-width: 750px) {
    width: 90%;
  }
`

const FormGroup = styled.div`
  display: block;
  text-align: center;
  margin-bottom: 50px;
`
const BoxGroup = styled.div`
  display: block;
  text-align: center;
  width: 45%;
`

const CheckText = styled.div`
  height: 3px;
  text-align: center;
  font-size: 20px;
  margin-left: 5px;
  margin-top: 3px;
  color: rgb(255, 162, 0);
  @media (max-width: 750px) {
    font-size: 13px;
  }
`

const Labal = styled.div`
  margin-bottom: 3px;
  font-size: 25px;
  .center {
    margin-left : 25px;
    @media (max-width: 750px) {
      margin-left : 15px;
  }
  }
  .require {
    color: rgb(255, 162, 0);
    line-height: 2;
  }
  :nth-child(6) {
    margin-left: 1000px;
  }
  @media (max-width: 750px) {
    font-size: 14px;
  }
`

const BoxWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  justify-content: space-around;
  margin-bottom: 70px;
`
const Input = styled.input`
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
  border: solid 2px #d2d2d2;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
    @media (max-width: 750px) {
    font-size: 11px;
  }
  }
  .title {
    font-size: 30px;
  }
`

const Enroll = styled.button`
  width: 100%;
  text-align: center;
  align-items: center;
  padding: 0px 0px;
  background-color: rgb(243, 200, 18);
  height: 70px;
  border: 1px solid transparent;
  border-radius: 13px;
  color: white;
  font-size: 25px;
  font-weight: bold;
  @media (max-width: 750px) {
    height : 40px;
    font-size: 15px;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
  border: solid 2px #d2d2d2;
  resize: none;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
    @media (max-width: 750px) {
    font-size: 11px;
    }
  }
`

const TimeWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  height: 30px;
  border-radius: 8px;
  border: solid 2px #d2d2d2;
  resize: none;
  input {
    height: 80%;
    width: 100%;
    margin-top: 3px;
    outline: none;
    text-align: center;
    border: 0mm #f7f4f41c;
    @media (max-width: 750px) {
      font-size: 10px;
    }
  }
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
`

const CookWrapper = styled.div`
  width: 100%;
  height: 100%;
  span {
    font-size: 23px;
  }
`

const InlineBox = styled.div`
  display: flex;
  justify-items: flex-start;
  margin-bottom: 10px;
  .number {
    font-size: 15px;
    margin-top: 16px;
    margin-right: 3px;
    color: #c4c4c4;
    @media (max-width: 750px) {
      font-size: 10px;
      margin-top: 20px;
    }
  }
`

const ClickWrap = styled.div`
  display: flex;
  justify-content: center;
`

const ClickBtn = styled.button`
  height: 35px;
  width: 25%;
  background-color: #a5a5a5;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s linear;
  :hover {
    background-color: #e89a13;
  }
  :nth-child(1) {
    margin-left: 9px;
    @media (max-width: 750px) {
      margin-left: 5.5px;
    }
  }
  :nth-child(2) {
    margin-left: 5px;
  }
  @media (max-width: 750px) {
    font-size: 11px;
    height: 25px;
  }
`
const CookTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 5px 10px 10px 10px;
  border-radius: 8px;
  margin-right: 5px;
  box-sizing: border-box;
  border: solid 2px #d2d2d2;
  resize: none;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
  ::placeholder {
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    color: #b5b5b5;
    @media (max-width: 750px) {
      font-size: 13px;
    }
  }
`
export default UpdateComponent
