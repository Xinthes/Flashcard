import React, { useEffect, useState } from "react";
import DeckListItem from "./DeckListItem";
import { listDecks } from "../utils/api";
import LoadingCircle from "../common/LoadingCircle";

function DeckList() {
  const [decks, setDecks] = useState(null);

  const deckList = decks
    ? decks.map((deck, idx) => (
        <DeckListItem key={idx} deck={deck} setDecks={setDecks} />
      ))
    : [];

  useEffect(() => {
    const controller = new AbortController();

    listDecks(controller.signal)
      .then(setDecks)
      .catch(() => {
        /* ignored */
      });

    return () => controller.abort();
  }, []);

  if (decks && decks.length) return deckList;
  else
    return (
      <div className={"col-12"}>
        {decks ? (
          <h1 className="text-center">
            Looks like there are currently no decks.
          </h1>
        ) : (
          <LoadingCircle container={false} />
        )}
      </div>
    );
}

export default DeckList;