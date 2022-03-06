import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Navigation userObj={userObj} isLoggedIn={isLoggedIn} />
      <Switch>
        <>
          <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Route exact path="/">
              <Home userObj={userObj} isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/profile">
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path="/auth">
              <Auth />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  );
};
export default AppRouter;
