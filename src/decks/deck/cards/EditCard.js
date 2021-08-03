import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingCircle from "../../../common/LoadingCircle";
import { readCard, updateCard } from "../../../utils/api";
import DynamicForm from "../../../common/DynamicForm";
import Breadcrumb from "../../../common/Breadcrumb";

function EditCard({ deck }) {
  const history = useHistory();
  const { cardId } = useParams();

  const [card, setCard] = useState(
    deck ? deck.cards.find((tmpCard) => tmpCard.id === cardId) : {}
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    readCard(cardId, controller.signal)
      .then(setCard)
      .catch((error) => {
        /* ignored */
      });

    return () => controller.abort();
  }, [cardId]);

  if (!deck || !card) return <LoadingCircle container={true} />;

  const submitCard = (formData) => {
    setSubmitting(true);

    updateCard({ id: cardId, deckId: deck.id, ...formData }, null)
      .then((tmpCard) => {
        const find = deck.cards.find((tmp) => tmp.id === tmpCard.id);

        if (find) {
          find.front = tmpCard.front;
          find.back = tmpCard.back;
        }

        return tmpCard;
      })
      .then(() => setSubmitting(false))
      .then(() => history.push(`/decks/${deck.id}`))
      .catch((error) => {
        /* Graceful Error*/
        console.log(error);
      });
  };

  const content = !submitting ? (
    <DynamicForm
      inputs={[
        {
          inputType: "textarea",
          id: "front",
          name: "front",
          formattedName: "Front",
          placeholder: "Front side of card",
          defaultValue: card.front,
        },
        {
          inputType: "textarea",
          id: "back",
          name: "back",
          formattedName: "Back",
          placeholder: "Back side of card",
          defaultValue: card.back,
        },
      ]}
      submit={{ action: submitCard }}
      cancel={{ url: `/decks/${deck.id}` }}
    />
  ) : (
    <LoadingCircle />
  );

  return (
    <React.Fragment>
      <div className={"row"}>
        <div className="col-12">
          <Breadcrumb
            includeHome={true}
            navigation={[
              { name: deck.name, url: `/decks/${deck.id}` },
              { name: "Edit Card " + cardId },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">
          <h3>Edit Card</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default EditCard;