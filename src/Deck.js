import React, { useState, useEffect } from "react";
import axios from "axios";

const Deck = ({ deck, Reload }) => {
  const [card, setCard] = useState(null);
  const [remaining, setRemaining] = useState(52);

  useEffect(() => drawCard(), [deck]);

  const drawCard = () => {
    async function getCard() {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
        );
        setCard(res.data.cards[0]);
        setRemaining((r) => r - 1);
      } catch (err) {
        console.log(err);
      }
    }
    getCard();
  };

  // I Don't know exactly what is going on here ....
  useEffect(() => {
    const intervalID = setInterval(() => {
      drawCard();
    }, 1000);

    return function () {
      clearInterval(intervalID);
    };
  }, [card]);

  return (
    <div>
      <button
        style={{ margin: `20px`, padding: `10px` }}
        onClick={() => {
          drawCard();
        }}
        className='draw-button'>
        Gimme a Card!
      </button>
      {card ? (
        <div>
          <img src={card.image} alt={`${card.value} ${card.suite}`} />
        </div>
      ) : null}
      {remaining ? (
        <h1>{remaining} cards left</h1>
      ) : (
        <button
          style={{ marging: `20px`, padding: `10px` }}
          onClick={() => {
            Reload();
            setRemaining(52);
          }}>
          New Deck
        </button>
      )}
    </div>
  );
};

export default Deck;
