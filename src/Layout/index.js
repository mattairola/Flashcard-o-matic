import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
import "./Layout.css"

import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Decks from "../Decks";


function Layout() {
  const [ decks, setDecks ] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const decksLoaded = await listDecks();
      setDecks(decksLoaded);
    }
    loadDecks();
  }, []);
  
  return (
    <div>
      <Header />
      <div className="container">
      <Switch>
        <Route exact path="/">
          <Home decks={decks} />
        </Route>

        <Route path="/decks">
          <Decks decks={decks}/>
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
  );
}

export default Layout;
