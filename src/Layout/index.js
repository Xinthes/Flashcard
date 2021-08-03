import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "../home/Home";
import Decks from "../decks/Decks";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <Home />
          </Route>
          <Route path={"/decks"}>
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
