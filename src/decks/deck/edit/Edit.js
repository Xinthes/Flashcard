import React from "react";
import Breadcrumb from "../../../common/Breadcrumb";
import LoadingCircle from "../../../common/LoadingCircle";
import DynamicForm from "../../../common/DynamicForm";
import { useHistory } from "react-router-dom";
import { updateDeck } from "../../../utils/api";

function Edit({ deck }) {
  const history = useHistory();

  const update = (formData) => {
    updateDeck({ id: deck.id, ...formData })
      .then(() => {
        deck.name = formData.name;
        deck.description = formData.description;
        history.push(`/decks/${deck.id}`);
      })
      .catch(() => {
        /* Graceful error */
      });
  };

  return deck ? (
    <React.Fragment>
      <div className={"row"}>
        <div className="col-12">
          <Breadcrumb
            includeHome={true}
            navigation={[
              { name: deck.name, url: `/decks/${deck.id}` },
              { name: "Edit Deck" },
            ]}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-12"}>
          <h3>Edit Deck</h3>
        </div>
      </div>
      <div className={"row"}>
        <div className={"col-12"}>
          <DynamicForm
            inputs={[
              {
                inputType: "text",
                id: "name",
                name: "name",
                formattedName: "Name",
                placeholder: "Deck Name",
                defaultValue: deck.name,
              },
              {
                inputType: "textarea",
                id: "description",
                name: "description",
                formattedName: "Description",
                placeholder: "Brief description of the deck",
                defaultValue: deck.description,
              },
            ]}
            submit={{ action: update }}
            cancel={{ url: `/decks/${deck.id}` }}
          />
        </div>
      </div>
    </React.Fragment>
  ) : (
    <LoadingCircle container={true} />
  );
}

export default Edit;