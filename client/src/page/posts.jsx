import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaRegBookmark, FaCog, FaRegTrashAlt } from 'react-icons/fa'

import api from '../api'
import { UserContext } from '../context/userContext'
import DropdownStar from '../component/posts/dropdownPosts'
import CommentComponent from '../component/comment/commentComponent'

const Posts = () => {
  const history = useHistory()
  const recipeId = history.location.pathname.split('=')[1]

  const { userInfo, setUserInfo } = useContext(UserContext)
  const [recipeInfo, setRecipeInfo] = useState({})
  const [date, setDate] = useState('')

  const getRecipeInfo = async () => {
    await api.get(`/recipes?id=${recipeId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => {
      setRecipeInfo(res.data.recipeData)
      const yymmdd = res.data.recipeData.createdAt.split('-')
      const dd = yymmdd[2].split('T')[0]
      setDate(`${yymmdd[0]}.${yymmdd[1]}.${dd}`)
    })
  }
  
  useEffect(() => {
    getRecipeInfo()
  }, [])

  const addFavorite = async () => {
    await api.post(`/users/favorite/${recipeId}`, {}, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => {
      window.location.reload()
    })
  }

  const deleteFavorite = async () => {
    await api.delete(`/users/favorite/${recipeId}`, {
      withCredentials:true
    })
    .then((res) => window.location.reload())
  }

  const updateRecipe = () => {
    history.push(`/update/id=${recipeId}`)
  }

  const deleteRecipe = async () => {
    await api.delete(`/recipes/${recipeId}`, {
      withCredentials: true
    })
    .then((res) =>{
      history.push('/recipe')
    })
  }

  const giveTasteScore = async () => {
    await api.post(`/recipes/${recipeId}/taste-score`, {
      score: 5
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => window.location.reload())
  }

  const giveEasyScore = async () => {
    await api.post(`/recipes/${recipeId}/easy-score`, {
      score: 5
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
    .then((res) => window.location.reload())
  }

  return (
    <Wrapper>
      <Form>
        <TitleArea> 
          <Favorite>
            { recipeInfo.isMyFavorite ? (
              <button onClick={deleteFavorite}>해제</button>
            ) : (
              <FaRegBookmark onClick={addFavorite}/>
            )}
          </Favorite>
          <Title>{recipeInfo.title}</Title>
          <TextWrap>
            <Category>{`총 소요 시간 : ${recipeInfo.requiredTime}`}</Category>
            <Editor>작성자</Editor>
          </TextWrap>
          <TextWrap>
            <Category>{`카테고리 : ${recipeInfo.category}`}</Category>
            <Editor className="date">{recipeInfo.createdAt && date}</Editor>
          </TextWrap>
          { recipeInfo.userId === userInfo.id ? (
            <>
              <TitleIcon1>
                <FaCog onClick={updateRecipe} />
              </TitleIcon1>
              <TitleIcon2>
                <FaRegTrashAlt onClick={deleteRecipe} />
              </TitleIcon2>
            </>
          ) : null }
        </TitleArea>
        <ScoreWrap>
          <ScoreContent>{`맛 ${recipeInfo.tasteAvg}`}</ScoreContent>
          <ScoreContent>{`간편성 ${recipeInfo.easyAvg}`}</ScoreContent>
        </ScoreWrap>
        <MainImage style={{backgroundImage: `url('${recipeInfo.mainImg}')`}}/>
        <BoxWrap>
          <BoxGroup>
            {
              recipeInfo.isVoteTaste ? (
                <div>이미 투표</div>
              ) : (
                <>
                  <StarBtn onClick={giveTasteScore}>맛 별점주기</StarBtn>
                  <DropdownStar className="taste" color="blue" />
                </>
              )
            }
          </BoxGroup>
          <BoxGroup>
            {
              recipeInfo.isVoteEasy ? (
                <div>이미 투표</div>
              ) : (
                <>
                  <StarBtn onClick={giveEasyScore}>간편성 별점주기</StarBtn>
                  <DropdownStar className="simple" color="red" />
                </>
              )
            }
          </BoxGroup>
        </BoxWrap>
        <Labal>요리소개</Labal>
        <Textarea value={recipeInfo.introduction} />

        <ContentWrap>
          <Labal>재료</Labal>
          <Contents>
            <ul>
              {
                recipeInfo.ingredients && recipeInfo.ingredients.map((el) => {
                  return (
                    <li>{`${el[0]} : ${el[1]}`}</li>
                  )
                })
              }
            </ul>
          </Contents>
        </ContentWrap>

        <ContentWrap>
          <Labal>요리 방법</Labal>
          <Contents>
            <ol>
              {
                recipeInfo.content && recipeInfo.content.map((el) => {
                  return (
                    <li>{el}</li>
                  )
                })
              }
            </ol>
          </Contents>
        </ContentWrap>
        <Labal>요리 사진</Labal>
        <SubWrap>
          {
            recipeInfo.contentImg && recipeInfo.contentImg.map((el) => {
              return (
                <SubImage style={{backgroundImage: `url('${el}')`}}/>
              )
            })
          }
        </SubWrap>
        <CommentComponent recipesId={recipeId} comments={recipeInfo.commentData}/>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  align-items: center;
`

const Form = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 25px 0px;
  @media (max-width: 750px) {
    width: 90%;
  }
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 3px;
  text-align: center;
  color: rgb(77, 77, 77);
  padding-bottom: 10px;
  border-bottom: solid 1px #d4d4d4;
`

const TitleIcon1 = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 15px;
  color: #7b7b7b;
  :hover {
    color: #f3c811;
    font-size: 18px;
  }
`

const TitleIcon2 = styled.div`
  position: absolute;
  top: 35px;
  right: 5px;
  font-size: 15px;
  color: #7b7b7b;
  :hover {
    color: #f3c811;
    font-size: 18px;
  }
`

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

const Editor = styled.p`
  margin: 5px 0;
  font-size: 15px;
`

const Category = styled.p`
  font-size: 15px;
  margin: 5px 0;
`

const TitleArea = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
  font-size: 30px;
  margin-bottom: 60px;
`

const MainImage = styled.div`
  height: 400px;
  background-color: black;
`

const ScoreWrap = styled.div`
  display: flex;
  text-align: center;
`

const ScoreContent = styled.div`
  display: flex;
  height: 30px;
  padding: 3px 10px;
  font-size: 14px;
  margin-right: 15px;
  background-color: #857d7d2f;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 5px;
`

const Favorite = styled.div`
  position: absolute;
  left: 10px;
  color: #e9b83a;
  font-size: 25px;
  top: 1px;
  opacity: 0.7;
`

const BoxWrap = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 15px;
  border-bottom: solid 1px rgb(138, 138, 138);
`

const BoxGroup = styled.div`
  display: flex;
  text-align: center;
  width: 45%;
`

const StarBtn = styled.button`
  border: none;
  border-radius: 6px;
`

const Labal = styled.h3`
  margin-bottom: 5px;
`

const Textarea = styled.textarea`
  width: 90%;
  height: 100px;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  margin: 0 auto;
  margin-bottom: 30px;
  box-sizing: border-box;
  border: solid 2px #d2d2d2;
  resize: none;
  :focus {
    border: solid 2px rgb(243, 200, 18);
    outline: none;
  }
`

const Contents = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 10px;
  align-items: center;
  border-radius: 8px;
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
  }
`

const ContentWrap = styled.div`
  align-items: center;
  text-align: center;
  margin: 20px;
`

const SubWrap = styled.div`
  display: flex;
  width: 100%;
`

const SubImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: black;
  /* width : 50%;
background-color : black;
height : 300px;
margin : 3px; */
`
export default Posts
