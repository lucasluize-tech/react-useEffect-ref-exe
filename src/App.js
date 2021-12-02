import "./App.css";
import Deck from "./Deck";
import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
  const newDeck = function () {
    axios
      .get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
      .then((res) => setDeck(res.data))
      .catch((err) => console.error(err));
  };
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    newDeck();
  }, []);

  return (
    <div className='App'>
      <Deck deck={deck} Reload={() => setDeck(newDeck())} />
    </div>
  );
}

export default App;
