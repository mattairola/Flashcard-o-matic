import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api/index";
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards"

function Study() {
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const [ studyDeck, setStudyDeck ] = useState({})
    const [ studyCard, setStudyCard ] = useState({
        cards: [],
        currentCard: 0,
        cardMax: 0,
        front: true,
        flip: false
    });

    useEffect(() => {
        async function loadStudyDeck() {
            const result = await readDeck(deckId);
            setStudyDeck(result);
            setStudyCard({
                cards: result.cards,
                currentCard: 0,
                cardMax: result.cards.length,
                front: true,
                flip: false
            });
        }
        loadStudyDeck();
    }, [deckId]);

    if(studyCard.cards.length < 3){
        return (
            <NotEnoughCards deck={studyDeck} />
        )
    }

    const handleFlip = () => {
        setStudyCard({
            ...studyCard,
            front: !studyCard.front,
            flip: true,
        });
    }

    const cardDisplay = () => {
        return studyCard.front
            ? studyCard.cards[studyCard.currentCard].front
            : studyCard.cards[studyCard.currentCard].back
    }

    const handleNext = () => {
        if(studyCard.currentCard >= studyCard.cardMax -1) {
            if(window.confirm(`Do you want to restart the deck? \n \nSelecting cancel will return you to the home page.`)){
                setStudyCard({
                    ...studyCard,
                    currentCard: 0,
                    front: true,
                    flipped: false
                })
            }else{
                history.push("/");
            }
        }else{
            setStudyCard({
                ...studyCard,
                front: true,
                flipped: false,
                currentCard: studyCard.currentCard + 1,
            })
        }
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={"/"} className="btn btn-link">Go Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`} className="btn btn-link">{studyDeck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Study
                    </li>
                </ol>
            </nav>
            <h4>Study: {studyDeck.name}</h4>
                <div className="card studyCard">
                    <div className="card-body">
                        <p>{`Card ${studyCard.currentCard + 1} of ${studyCard.cardMax}`}</p>
                        <h5 className="card-text">{cardDisplay()}</h5>
                        <button className="btn btn-primary button" onClick={handleFlip}>
                            Flip
                        </button>
                        {!studyCard.front ? (
                            <button className="btn btn-secondary button" onClick={handleNext}>
                            Next </button> ) : null }
                    </div>
                </div>
        </div>
    )
}

export default Study;