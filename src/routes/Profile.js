import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { authService } from "fbase";
import { useHistory } from "react-router-dom";
import Content from "components/Content";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    dbService
      .collection("contents")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const contentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContents(contentArray);
      });
  }, []);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input onChange={onChange} type="text" autoFocus placeholder="Display name" value={newDisplayName} className="formInput" />
        <input
          type="submit"
          value="닉네임 수정"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
      <div className="my-content">
        <span>내가 작성한 글</span>
        {contents.map((content) => (
          <Content key={content.id} contentObj={content} isOwner={content.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
