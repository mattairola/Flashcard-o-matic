import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api"
import DeckForm from "./DeckForm"

function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [ deck, setDeck ] = useState({
        id: 0,
        name: "",
        description: "",
    });

    useEffect(() => {
        async function loadDecks() {
            const result = await readDeck(deckId);
            setDeck(result);
        }
        loadDecks();
    }, [deckId]);

    const nameChangeHandler = (event) => {
        setDeck({...deck, name: event.target.value});
    }

    const descChangeHandler = (event) => {
        setDeck({...deck, description: event.target.value})
    }

    const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(deck).then((result) => history.push(`/decks/${result.id}`));
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"} className="btn btn-link">Go Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
        <h4>Edit Deck</h4>
            <DeckForm 
                deck={deck}
                nameChangeHandler={nameChangeHandler}
                descChangeHandler={descChangeHandler}
                submitHandler={submitHandler}
            />
        </div>
    );
}

export default EditDeck;