import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api/index.js";

function CardList({ deck }){
  const history = useHistory();

  const deleteCardHandler = (cardId) => {
    if(window.confirm(`Delete this card? \n \nYou will not be able to recover it.`)){
        deleteCard(cardId).then(history.go(0));
    }
  };

  return (
  <div>
    <ul>
    {deck.cards.map((card) => (
      <div key={card.id} className="card">
        <li className="list-group-item">
          <div className="d-flex justify-content-between row">
            <div className="col">
              <div>
                {card.front}
              </div>
              <br/>
              <div>
                {card.back}
              </div>
            </div>
          </div>
          <div>
            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
              <button type="button" className="btn btn-secondary button">Edit Card</button>
            </Link>
              <button
                  type="button"
                  onClick={() => deleteCardHandler(card.id)}
                  className="btn btn-danger button"
              >
              Delete Card
              </button>
          </div>
        </li>
      </div>
      ))}
      </ul>
    </div>
  )
}

export default CardList;