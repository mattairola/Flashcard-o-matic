import React from "react";
import { useHistory } from "react-router-dom";

function CreateDeck(){
    const history = useHistory();

    return (
        <button 
            className="btn btn-warning btn-lg btnCreate" 
            type="button"
            onClick={() => history.push("/decks/new")}
        >
            Create Deck
        </button>
    )
}

export default CreateDeck;