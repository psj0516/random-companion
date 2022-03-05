import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Content = ({ contentObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newContent, setNewContent] = useState(contentObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`contents/${contentObj.id}`).delete();
      await storageService.refFromURL(contentObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`contents/${contentObj.id}`).update({
      text: newContent,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewContent(value);
  };
  return (
    <div className="content">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container contentEdit">
            <input type="text" placeholder="내용을 수정하세요" value={newContent} required autoFocus onChange={onChange} className="formInput" />
            <input type="submit" value="수정하기" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          {contentObj.attachmentUrl && <img src={contentObj.attachmentUrl} />}
          <h4>{contentObj.text}</h4>
          {isOwner && (
            <div className="content__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Content;
