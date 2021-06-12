import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

function NotEnoughCards({ deck }) {
    const { url } = useRouteMatch();

    if(!deck){
        return <p>Loading...</p>
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`${url}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Study
                </li>
            </ol>
            </nav>
                <h4>Study: {deck.name}</h4>
                <h5>There are not enough cards.</h5>
                <p>There must be at least 3 cards in a deck in order to study.</p>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
        </div>
    )
}

export default NotEnoughCards;