import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index"
import CardForm from "./CardForm";

function AddCard() {
    const { deckId } = useParams();
    const history = useHistory();
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({
        front: "",
        back: "",
        deckId,
    });

    useEffect(() => {
        async function loadDeck() {
            const result = await readDeck(deckId);
            setDeck(result);     
        }
        loadDeck();
    }, [deckId]);

    const cardFrontHandler = (event) => {
        setCard({ ...card, front: event.target.value });
    }

    const cardBackHandler = (event) => {
        setCard({ ...card, back: event.target.value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        async function updateCardData() {
            await createCard(deck.id, card).then(history.push(`/decks/${deckId}`));
            setCard({ ...card });
            }
        updateCardData();
    };

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"} className="btn btn-link">Go Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <h4>{deck.name}</h4>
                <CardForm 
                    cardFrontHandler={cardFrontHandler}
                    cardBackHandler={cardBackHandler}
                    submitHandler={submitHandler}
                    card={card}
                />
        </div>
    )
}

export default AddCard;