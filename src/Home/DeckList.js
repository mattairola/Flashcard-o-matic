import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckList({ decks }){
    const history = useHistory();

    const deleteDeckHandler = (deckId) => {
        if(window.confirm(`Are you sure you want to delete this deck? \n \nYou will not be able to recover it.`)){
            deleteDeck(deckId).then(history.go(0));
        }
    };

    const returnedList = decks.map((deck, index) => (
            <div className="card" key={index}>
                <div className="card-body">
                    <div className="row justify-content-between">
                        <h2 className="card-title">{deck.name}</h2>
                        <p className="cardsLeft">{deck.cards.length} cards</p>
                    </div>
                    <p className="card-text">{deck.description}</p>
                    <div className="container">
                        <div className="row">
                            <div className="col col-lg-10">
                                <Link to={`/decks/${deck.id}`} className="btn btn-secondary button">View</Link>
                                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary button">Study</Link>
                            </div>
                            <div className="col col-lg-2">
                                <button className="btn btn-danger button" onClick={() => deleteDeckHandler(deck.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))

    return <ul>{returnedList}</ul>
}

export default DeckList;


