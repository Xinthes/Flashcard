import React, { useState } from "react";
import Breadcrumb from "../../../common/Breadcrumb";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../../utils/api";
import LoadingCircle from "../../../common/LoadingCircle";
import DynamicForm from "../../../common/DynamicForm";

function NewDeck() {
  const history = useHistory();

  const [submitting, setSubmitting] = useState(false);

  const submitDeck = (formData) => {
    setSubmitting(true);

    createDeck(formData, null)
      .then((deck) => history.push(`/decks/${deck.id}`))
      .then(() => {
        setSubmitting(false);
      })
      .catch(() => {
        /* ignored */
      });
  };

  const content = !submitting ? (
    <DynamicForm
      inputs={[
        {
          inputType: "text",
          id: "name",
          name: "name",
          formattedName: "Name",
          placeholder: "Deck Name",
          defaultValue: "",
        },
        {
          inputType: "textarea",
          id: "description",
          name: "description",
          formattedName: "Description",
          placeholder: "Brief description of the deck",
          defaultValue: "",
        },
      ]}
      submit={{ action: submitDeck }}
      cancel={{ url: "/" }}
    />
  ) : (
    <LoadingCircle container={false} />
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <Breadcrumb
            includeHome={true}
            navigation={[{ name: "Create Deck" }]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h1>Create Deck</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">{content}</div>
      </div>
    </React.Fragment>
  );
}

export default NewDeck;