import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa'
import { SearchValueContext } from '../../context/searchValueContext'

const SearchBoxModal = ({ showSearchBox, setShowSearchBox }) => {
  const history = useHistory()
  const { isValue, setIsValue } = useContext(SearchValueContext)
  const [inputValue, setInputValue] = useState('')

  const SearchRedirect = (e) => {
    if (e.type === 'click') {
      setShowSearchBox(false)
      history.push(`/search/${inputValue}`)
      setIsValue(inputValue)
      setInputValue('')
      return
    }
    if (e.key === 'Enter') {
      setShowSearchBox(false)
      history.push(`/search/${inputValue}`)
      setIsValue(inputValue)
      setInputValue('')
    }
  }

  return (
    <>
      <Wrapper onSubmit={SearchRedirect}>
        <div
          className={showSearchBox ? 'Background' : null}
          onClick={() => setShowSearchBox(false)}
        ></div>
        <div className={showSearchBox ? 'opened' : 'modal'} aria-hidden="true">
          <div className="modal-dialog">
            <Button onClick={() => setShowSearchBox(false)} aria-hidden="true">
              <FaRegTimesCircle />
            </Button>
            <div className="modal-body">
              <input
                type="text"
                placeholder="검색"
                name="u"
                size="20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => SearchRedirect(e)}
              />
              <FaSearch
                className="icon"
                type="submit"
                onClick={SearchRedirect}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  .Background {
    background: #606060;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: 50%;
    z-index: 10000000;
  }
  .modal:before {
    content: '';
    display: none;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
  .opened:before {
    display: block;
  }
  .opened .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
    top: 40%;
  }
  .modal-dialog {
    background: #fefefe;
    border: #333333 solid 0px;
    border-radius: 5px;
    margin-left: -250px;
    text-align: center;
    position: fixed;
    left: 50%;
    top: -100%;
    z-index: 1100000000;
    width: 500px;
    height: 70px;
    box-sizing: border-box;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
    -webkit-transform: translate(0, -500%);
    -ms-transform: translate(0, -500%);
    transform: translate(0, -500%);
    -webkit-transition: -webkit-transform 0.3s ease-out;
    -moz-transition: -moz-transform 0.3s ease-out;
    -o-transition: -o-transform 0.3s ease-out;
    transition: transform 0.3s ease-out;
  }
  .modal-body {
    padding: 20px;
    position: relative;
  }
  .modal-body input {
    width: 300px;
    padding: 8px;
    color: #888;
    outline: 0;
    background-color: #e1e1e1;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-right: 0px;
    border-top: 0px;
    border-radius: 30px;
  }
  .icon {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 100px;
    color: #888;
    top: 29px;
  }
  .icon:hover {
    color: #888;
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease-out;
  }
`

const Button = styled.button`
  position: absolute;
  top: 5px;
  right: 1px;
  border: none;
  z-index: 100000;
  opacity: 0.5;
  background-color: white;
  color: #999;
`

export default SearchBoxModal
