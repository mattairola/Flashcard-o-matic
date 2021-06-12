import React from "react";
import { Route, Switch } from "react-router-dom";
import DeckList from "./DeckList";
import CreateDeck from "./CreateDeck";
import Decks from "../Decks";

function Home({ decks }){
    return (
        <div>
            <CreateDeck />
            <Switch>
                <Route exact path="/">
                    <DeckList decks={decks} />
                </Route>

                <Route path="/decks">
                    <Decks decks={decks} />
                </Route>
            </Switch>
        </div>
    )
}

export default Home;

