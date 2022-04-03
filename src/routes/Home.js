import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Content from "components/Content";
import ContentFactory from "components/ContentFactory";
import { faDice, faDog, faCat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Home = ({ userObj }) => {
  const [contents, setContents] = useState([]);
  const [contextInx, setContentInx] = useState(0);
  const [init, setInit] = useState(true);

  const getContent = () => {
    dbService
      .collection("contents")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const contentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const random = Math.floor(Math.random() * snapshot.size);
        setContents(contentArray[random]);
        setContentInx(snapshot.size);
      });
    setInit(false);
  };

  return (
    <div className="container">
      <div style={{ marginTop: 30 }}>
        {init ? (
          <div className="info">
            <FontAwesomeIcon icon={faDog} color={"#ECDBBA"} size="2x" />
            <FontAwesomeIcon icon={faCat} color={"#ECDBBA"} size="2x" />
            <br />
            <br />
            <span>아래 버튼을 눌러보세요!</span>
            <button className="randomBtn" onClick={getContent}>
              {<FontAwesomeIcon icon={faDice} color={"#191919"} size="2x" />}
            </button>
            {userObj ? null : (
              <div style={{ paddingTop: 20, textAlign: "center", textDecoration: "underline" }}>
                <span>
                  <Link to="/auth">로그인하러 가기 &rarr;</Link>
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            {!contents ? (
              <>
                <span>아직 아무도 자랑하지 않았어요!</span>
                {userObj ? (
                  <ContentFactory userObj={userObj} index={contextInx} />
                ) : (
                  <div style={{ marginTop: 30, textAlign: "center", textDecoration: "underline" }}>
                    <Link to="/auth">
                      <h4>나도 자랑하러 가기(로그인) &rarr;</h4>
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                {" "}
                <Content key={contents.id} contentObj={contents} isOwner={userObj ? contents.creatorId === userObj.uid : null} />
                <button className="randomBtn" onClick={getContent}>
                  {<FontAwesomeIcon icon={faDice} color={"#191919"} size="2x" />}
                </button>
                {userObj ? (
                  <ContentFactory userObj={userObj} index={contextInx} />
                ) : (
                  <div style={{ marginTop: 30, textAlign: "center", textDecoration: "underline" }}>
                    <Link to="/auth">
                      <h4>나도 자랑하러 가기(로그인) &rarr;</h4>
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Home;
