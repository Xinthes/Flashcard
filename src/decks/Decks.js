import React from "react";
import { Route, Switch } from "react-router-dom";
import NewDeck from "./deck/new/NewDeck";
import Deck from "./deck/Deck";
import NotFound from "../Layout/NotFound";

function Decks() {
  return (
    <Switch>
      <Route exact path="/decks/new">
        <NewDeck />
      </Route>
      <Route path="/decks/:deckId">
        <Deck />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Decks;