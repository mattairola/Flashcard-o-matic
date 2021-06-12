import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [ deckName, setDeckName ] = useState("");
    const [ card, setCard ] = useState({
        id: cardId,
        front: "",
        back: "",
        deckId: Number(deckId)
    });

    useEffect(() => {
        async function loadCard() {
            const result = await readCard(cardId);
            setCard({
                id: cardId,
                front: result.front,
                back: result.back,
                deckId: Number(deckId)
            });
        }
        async function loadDeckName() {
            const deck = await readDeck(deckId);
            setDeckName(deck.name);
        }
        loadCard();
        loadDeckName();
    }, [cardId, deckId]);

    const cardFrontHandler = (event) => {
        setCard({ ...card, front: event.target.value });
    }

    const cardBackHandler = (event) => {
        setCard({ ...card, back: event.target.value });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        updateCard(card).then((result) => history.push(`/decks/${result.deckId}`));
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                      <Link to={"/"} className="btn btn-link">Go Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                      <Link to={`/decks/${deckId}`}>{deckName}</Link>
                  </li>
                  <li className="breadcrumb-item">
                      Edit Card
                  </li>
              </ol>
            </nav>
        <h4>Edit Deck</h4>
            <CardForm
                submitHandler={submitHandler}
                cardBackHandler={cardBackHandler}
                cardFrontHandler={cardFrontHandler}
                card={card}
            />
        </div>
    )
}

export default EditCard;