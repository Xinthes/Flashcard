import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { readDeck } from "../../utils/api";
import Study from "./study/Study";
import Breadcrumb from "../../common/Breadcrumb";
import LoadingCircle from "../../common/LoadingCircle";
import DeleteDeckButton from "../../common/DeleteDeckButton";
import CardList from "./CardList";
import NotFound from "../../Layout/NotFound";
import Edit from "./edit/Edit";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";

function DeckView({ setCards, deck }) {
  const history = useHistory();

  return deck ? (
    <React.Fragment>
      <div className={"row"}>
        <div className="col-12">
          <Breadcrumb includeHome={true} navigation={[{ name: deck.name }]} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card border-0">
            <div className="card-body p-0">
              <div className="card-title">
                <h4>{deck.name}</h4>
              </div>
              <p className="card-text">{deck.description}</p>
              <Link
                className="btn btn-secondary mr-2"
                to={`/decks/${deck.id}/edit`}
              >
                <span className="oi oi-pencil" /> Edit
              </Link>
              <Link
                className="btn btn-primary mr-2"
                to={`/decks/${deck.id}/study`}
              >
                <span className="oi oi-book" /> Study
              </Link>
              <Link
                className="btn btn-primary"
                to={`/decks/${deck.id}/cards/new`}
              >
                <span className="oi oi-plus" /> Add Cards
              </Link>
              <DeleteDeckButton
                id={deck.id}
                onComplete={() => history.push("/")}
              />
            </div>
          </div>
        </div>
      </div>
      <CardList setCards={setCards} cards={deck.cards} />
    </React.Fragment>
  ) : (
    <LoadingCircle container={true} />
  );
}

function Deck() {
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    readDeck(deckId, controller.signal)
      .then(setDeck)
      .catch(() => {
        /* ignored */
      });

    return () => controller.abort();
  }, [deckId]);

  const setCards = (func) => {
    setDeck((currentDeck) => ({
      ...currentDeck,
      cards: func(currentDeck.cards),
    }));
  };

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={`${url}`}>
          <DeckView setCards={setCards} deck={deck} />
        </Route>
        <Route path={`${url}/edit`}>
          <Edit deck={deck} />
        </Route>
        <Route path={`${url}/study`}>
          <Study deck={deck} />
        </Route>
        <Route path={`${url}/cards/new`}>
          <AddCard deck={deck} />
        </Route>
        <Route path={`${url}/cards/:cardId/edit`}>
          <EditCard deck={deck} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default Deck;