import React from "react";
import { Link } from "react-router-dom";

function DeckForm({
    deck = {},
    nameChangeHandler,
    descChangeHandler,
    submitHandler,
    }){

    return (
        <form onSubmit={submitHandler}>
            <div className="createDeck">
                <label className="col deckHeader" htmlFor="deckName">Deck Name</label>
                    <input 
                        type="text"
                        id="deckName" 
                        placeholder="Deck Name" 
                        onChange={nameChangeHandler}
                        defaultValue={deck.name}
                    />
            </div>
            <div className="createDeck">
                <label className="col deckHeader" htmlFor="description">Deck Description</label>
                <textarea
                    type="text" 
                    id="description"  
                    placeholder="Brief Description of the Deck"
                    onChange={descChangeHandler}
                    defaultValue={deck.description}
                />
            </div>
                <Link to={"/"} className="btn btn-secondary button">Cancel</Link>
                <button type='submit' className="btn btn-primary button">Save</button>          
       </form>
    )
}

export default DeckForm;