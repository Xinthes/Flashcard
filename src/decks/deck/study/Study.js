import React, { useState } from "react";
import Breadcrumb from "../../../common/Breadcrumb";
import LoadingCircle from "../../../common/LoadingCircle";
import StudyCard from "./StudyCard";

function Study({ deck }) {
  const initialState = {
    cardNumber: 0,
    flipped: false,
    hasBeenFlipped: false,
  };

  const [state, setState] = useState({ ...initialState });

  const updateState = (key, value) =>
    setState((current) => ({ ...current, [key]: value }));

  return deck ? (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <Breadcrumb
            includeHome={true}
            navigation={[
              { name: deck.name, url: "/decks/" + deck.id },
              { name: "Study" },
            ]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1>Study: {deck.name}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <StudyCard
            deckId={deck.id}
            card={deck.cards[state.cardNumber]}
            total={deck.cards.length}
            state={state}
            updateState={updateState}
          />
        </div>
      </div>
    </React.Fragment>
  ) : (
    <LoadingCircle container={true} />
  );
}

export default Study;