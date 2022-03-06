import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const ContentFactory = ({ userObj, index }) => {
  const [content, setContent] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (content === "" || attachment == "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const contentObj = {
      contentId: index,
      text: content,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("contents").add(contentObj);
    setContent("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setContent(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <>
      <div className="factory-box"> 나도 자랑하기</div>
      <form onSubmit={onSubmit} className="factoryForm">
        <label htmlFor="attach-file" className="factoryInput__label">
          <span>사진 첨부하기</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>지우기</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        <div className="factoryInput__container">
          <input className="factoryInput__input" value={content} onChange={onChange} type="text" placeholder="코멘트를 적어주세요." maxLength={120} />
          <input type="submit" value="자랑하기" className="factoryInput__arrow" />
        </div>
      </form>
    </>
  );
};
export default ContentFactory;
