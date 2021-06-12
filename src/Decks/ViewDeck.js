import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api/index"
import CardList from "./CardList";
 
function ViewDeck() {
    const { url } = useRouteMatch();
    const { deckId } = useParams();
    const history = useHistory();
    const [ deck, setDeck ] = useState({
        id: 0,
        name: "",
        cards: []
    });

    useEffect(() => {
        async function loadDecks() {
            const result = await readDeck(deckId);
            setDeck(result);
        }
        loadDecks();
    }, [deckId]);

    const deleteDeckHandler = (deckId) => {
        if(window.confirm(`Delete this deck? \n \nYou will not be able to recover it.`)){
            deleteDeck(deckId);
            history.push("/");
            history.go(0);
        }
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
        <h4>{deck.name}</h4>
        <p>{deck.description}</p>
            <div className="col">
                <Link to={`${url}/edit`}>
                    <button type="button" className="btn btn-info button">
                        Edit Deck
                    </button>
                </Link>
                <Link to={`${url}/study`}>
                    <button type="button" className="btn btn-info button">
                        Study
                    </button>
                </Link>
                <Link to={`${url}/cards/new`}>
                    <button type="button" className="btn btn-info button">
                        Add Card
                    </button>
                </Link>
                    <button
                        type="button"
                        onClick={() => deleteDeckHandler(deck.id)}
                        className="btn btn-danger button"
                    >
                    Delete Deck
                    </button>
            </div>       
          <h4 className="listCards">Cards</h4>
          <CardList deck={deck} />
        </div>
    )
}

export default ViewDeck;