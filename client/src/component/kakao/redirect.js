import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { UserContext } from '../../context/userContext'
const dotenv = require('dotenv')
dotenv.config()

const Redirect = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const { userInfo, setUserInfo } = useContext(UserContext)

  const history = useHistory()

  let SERVERURL = process.env.REACT_APP_API_URL || 'http://localhost:80'
  let code = new URL(window.location.href).searchParams.get('code')
  axios.get(`${SERVERURL}/users/signup/oauth/kakao?code=${code}`, {
    headers: {
      'Content-Type':'application/json'
    },
    withCredentials: true
  })
    .then((res) => {
      let { id, email, nickname, description, createdAt } = res.data.userData
      createdAt = createdAt.substring(0, 10)
      let user = { id, email, nickname, description, createdAt }
      setUserInfo(user)
      setIsLoggedIn(true)
      history.push('/')
    })
    .catch(err => {
      console.log(err.message)
    })
  return <h1>Redirect KAKAO</h1>
}

export default Redirect
