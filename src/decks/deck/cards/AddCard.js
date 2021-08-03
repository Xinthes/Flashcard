import React, { useState } from "react";
import Breadcrumb from "../../../common/Breadcrumb";
import DynamicForm from "../../../common/DynamicForm";
import { createCard } from "../../../utils/api";
import LoadingCircle from "../../../common/LoadingCircle";

function AddCard({ deck }) {
  const [submitting, setSubmitting] = useState(false);

  if (!deck) return <LoadingCircle container={true} />;

  const submitCard = (formData) => {
    setSubmitting(true);

    createCard(deck.id, formData, null)
      .then((card) => deck.cards.push(card))
      .then(() => setSubmitting(false))
      .catch((error) => {
        /* ignored */
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
          defaultValue: "",
        },
        {
          inputType: "textarea",
          id: "back",
          name: "back",
          formattedName: "Back",
          placeholder: "Back side of card",
          defaultValue: "",
        },
      ]}
      submit={{ name: "Save", action: submitCard }}
      cancel={{ name: "Done", url: `/decks/${deck.id}` }}
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
              { name: "Add Card" },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">
          <h3>{deck.name}: Add Card</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default AddCard;