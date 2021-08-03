import React from "react";
import CardListItem from "./CardListItem";

function CardList({ setCards, cards }) {
  const cardList = cards.map((card, idx) => (
    <CardListItem key={idx} card={card} setCards={setCards} />
  ));

  return (
    <div className="row mt-4">
      <div className="col-12">
        <h3>Cards</h3>
      </div>
      <div className="col-12">{cardList}</div>
    </div>
  );
}

export default CardList;
