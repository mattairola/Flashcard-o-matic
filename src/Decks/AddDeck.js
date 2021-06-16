import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function AddDeck() {
    const history = useHistory();
    const [ newDeck, setNewDeck ] = useState({
        id: 0,
        name: "",
        description: ""
    });

    const nameChangeHandler = (event) => {
        setNewDeck({...newDeck, name: event.target.value});
      };
    
      const descChangeHandler = (event) => {
        setNewDeck({...newDeck, description: event.target.value});
      };

    const submitHandler = (event) => {
        event.preventDefault();
        createDeck(newDeck).then((result) => history.push(`/decks/${result.id}`));
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"} className="btn btn-link">Go Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
        <h4>Create Deck</h4>
            <DeckForm 
                newDeck={newDeck}
                nameChangeHandler={nameChangeHandler}
                descChangeHandler={descChangeHandler}
                submitHandler={submitHandler}
            />    
        </div>
    )
}

export default AddDeck;