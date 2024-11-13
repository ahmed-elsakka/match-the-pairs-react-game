import React from "react";
import "./Card.css";
import WORLD_MAP from "../ImageData/Images/world-map.jpg" ;

const Card = (props) => {
    const { card, handleChoice, flipped, disabled } = props;

    const handleClick = ()  => {
        if(!disabled) {
            handleChoice(card);
        }
    };

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped": ""}>
                <img src={card.src} alt="card front" className="front"/>
                <img src={WORLD_MAP} 
                    alt="card back"
                    className="back"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Card;