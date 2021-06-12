import React from "react";
import { Route, Switch } from "react-router-dom";

import AddDeck from "./AddDeck";
import ViewDeck from "./ViewDeck";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard"
import EditCard from "./EditCard"

function Decks({ decks }) {
    return (
        <div>
            <Switch>
                <Route path="/decks/new">
                    <AddDeck />
                </Route>

                <Route path="/decks/:deckId/study">
                    <Study decks={decks}/>
                </Route>

                <Route path="/decks/:deckId/edit">
                    <EditDeck />
                </Route>

                <Route path="/decks/:deckId/cards/new">
                    <AddCard />
                </Route>

                <Route path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard />
                </Route>

                <Route path="/decks/:deckId">
                    <ViewDeck decks={decks}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Decks;