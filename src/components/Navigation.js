import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaw } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
  <nav>
    <ul>
      <li>
        <Link to="/" style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faPaw} color={"#ECDBBA"} size="3x" />
        </Link>
      </li>
      <li>
        <Link
          to="/profile"
          style={{
            marginLeft: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 12,
          }}
        >
          <FontAwesomeIcon icon={faUser} color={"#ECDBBA"} size="2x" />
          <span style={{ marginTop: 10 }}>{userObj.displayName ? `${userObj.displayName}` : "Profile"}</span>
        </Link>
      </li>
    </ul>
  </nav>
);
export default Navigation;
