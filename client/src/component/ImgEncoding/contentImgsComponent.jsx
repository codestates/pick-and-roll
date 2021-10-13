import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { v4 as uuid4 } from 'uuid'
import { BsUpload } from 'react-icons/bs'
import { RiDeleteBinFill } from 'react-icons/ri'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storageService, storageRef } from './firebase'

const ContentImgsComponent = ({
  contentImgs,
  setContentImgs,
  contentImgsRef,
}) => {
  const [imgUrl, setImgUrl] = useState([])
  const [imgName, setImgName] = useState([])

  const onImgDrop = async (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const reader = new FileReader()
      reader.readAsDataURL(newFile)
      reader.onloadend = () => {
        setImgUrl([...imgUrl, reader.result])
      }

      let id = uuid4()
      const imgRef = ref(storageService, `contentMain/${id}`)
      const reference = await uploadBytes(imgRef, newFile).then(
        (snapshot) => {}
      )
      let url
      const getUrl = await getDownloadURL(imgRef).then((res) => {
        url = res
      })
      // console.log(url)

      const updatedList = [...contentImgs, url]
      setContentImgs(updatedList)
      setImgName([...imgName, newFile.name])
    }
  }

  const imgRemove = (img, index) => {
    const updatedList = [...contentImgs]
    updatedList.splice(contentImgs.indexOf(img), 1)
    setContentImgs(updatedList)
    const updatedUrl = [...imgUrl]
    updatedUrl.splice(index, 1)
    setImgUrl(updatedUrl)

    const updatedName = [...imgName]
    updatedName.splice(index, 1)
    setImgName(updatedName)
  }

  return (
    <Wrapper>
      <ImgInput>
        <div className="label">
          <BsUpload />
          <p>이 곳을 클릭하거나 사진을 가져오세요</p>
        </div>
        <input
          type="file"
          name="image"
          value=""
          encType="multipart/form-data"
          onChange={onImgDrop}
          ref={contentImgsRef}
        />
      </ImgInput>
      {contentImgs.length > 0 ? (
        <div className="preview">
          <p className="title">선택파일 목록</p>
          {contentImgs.map((item, index) => (
            <LoadedList key={index}>
              <img src={imgUrl[index]} alt="" />
              <p>{imgName[index]}</p>
              <span className="delete" onClick={() => imgRemove(item, index)}>
                <RiDeleteBinFill className="icon" />
              </span>
            </LoadedList>
          ))}
        </div>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

const ImgInput = styled.div`
  position: relative;
  height: 150px;
  border: 2px dashed rgb(243, 200, 18);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(247, 245, 238);
  input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  :hover {
    opacity: 0.6;
    background-color: rgb(110, 174, 233);
  }
  .label {
    text-align: center;
    color: rgb(67, 70, 73);
    font-weight: 600;
    padding: 10px;
  }
  .preview {
    background-color: rgb(92, 120, 146);
  }
  .preview p {
    font-weight: 500;
  }
  .title {
    margin-bottom: 20px;
  }
  @media (max-width: 750px) {
    height: 200px;
  }
`

const LoadedList = styled.div`
  display: flex;
  margin-bottom: 10px;
  background-color: #857d7d2f;
  padding: 15px;
  border-radius: 20px;
  width: 400px;
  height: 6pc;
  img {
    width: 100px;
    height: 100px;
  }
  p {
    font-size: 15px;
    position: relative;
    margin-left: 30px;
    margin-top: 50px;
  }
  .delete {
    background-color: rgb(110, 174, 233);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -7px;
    margin-left: 5px;
  }
  .delete:hover {
    background-color: rgba(202, 35, 35, 0.685);
    box-shadow: 3px;
    cursor: pointer;
    transition: 0.3s ease;
  }
`

export default ContentImgsComponent
