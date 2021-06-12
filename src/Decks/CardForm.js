import React from "react";
import { useHistory } from "react-router-dom";

function CardForm({
    cardFrontHandler,
    cardBackHandler,
    submitHandler,
    card = {}
    }) {
    
    const history = useHistory();

    return(
        <form>
          <div className="createDeck">
            <label className="col">Question</label>
                <textarea
                    type="text"
                    onChange={cardFrontHandler}
                    defaultValue={card.front}
                />
          </div>
          <div className="createDeck">
            <label className="col">Answer</label>
                <textarea
                    type="text"
                    onChange={cardBackHandler}
                    defaultValue={card.back}
                />
            </div>
            <button type="button" className="btn btn-secondary button" onClick={() => history.go(-1)}>Back to Deck</button>
            <button type="submit" className="btn btn-primary button" onClick={submitHandler}>Save</button>
        </form>
    )
}

export default CardForm;