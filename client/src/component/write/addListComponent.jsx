import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

const AddListContent = ({
  contents,
  setContents,
  contentsRef,
  setMessageContents,
}) => {
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

  return (
    <Wrapper>
      {contents.map((content, idx) => (
        <InlineBox key={idx}>
          <div className="number">{idx + 1}.</div>
          <Textarea
            type="text"
            onChange={(e) => {
              onChangeContent(e.target.value, idx)
            }}
            value={content}
            ref={contentsRef}
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
    </Wrapper>
  )
}
export default AddListContent
//////
export const AddListingredients = ({
  ingredients,
  setIngredients,
  ingredientsRef,
  setMessageIngredients,
}) => {
  const addList = () => {
    const newIngredients = [
      ...ingredients,
      {
        ingredient: '',
        amount: '',
      },
    ]
    setIngredients(newIngredients)
  }

  const onChangeIngredient = useCallback((obj, value, idx) => {
    if (!/[@,!.#$%^&*()]/g.test(value)) {
      let newIngredients = Object.assign(ingredients[idx], {
        ingredient: value,
      })
      let obj = ingredients.slice()
      obj.splice(idx, 1, newIngredients)

      setIngredients(obj)
    } else {
      setMessageIngredients('특수문자[@,!.#$%^&*()]를 사용하실 수 없습니다.')
    }
  })

  const onChangeAmount = (value, idx) => {
    if (!/[@,!.#$%^&*()]/g.test(value)) {
      let newIngredients = Object.assign(ingredients[idx], {
        amount: value,
      })
      let obj = ingredients.slice()
      obj.splice(idx, 1, newIngredients)

      setIngredients(obj)
    } else {
      setMessageIngredients('특수문자[@,!.#$%^&*()]를 사용하실 수 없습니다.')
    }
  }

  const deletList = () => {
    setIngredients(ingredients.slice(0, -1))
  }

  return (
    <Wrapper>
      {ingredients.map((obj, idx) => (
        <InlineBox key={idx}>
          <div className="number">{idx + 1}.</div>
          <Textarea
            type="text"
            placeholder="재료"
            onChange={(e) => {
              // console.log(obj.ingredient)
              onChangeIngredient(obj, e.target.value, idx)
            }}
            ref={ingredientsRef}
            value={obj.ingredient}
          />
          <Textarea
            type="text"
            placeholder="20g, 2T(티스푼), 1Cup 등"
            onChange={(e) => {
              onChangeAmount(e.target.value, idx)
            }}
            value={obj.amount}
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
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

const Textarea = styled.textarea`
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
