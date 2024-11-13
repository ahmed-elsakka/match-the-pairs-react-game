import React from "react";
import "./Header.css";

const Header = ({handleStart, handleRestart, time, fastestTime}) => {
    return (
        <>
            <h1>Match the Pairs</h1>
            <h2>Current time: {time} seconds</h2>
            <h2>Fastest time: {fastestTime !== null ? `${fastestTime} seconds` : "N/A"}</h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleRestart}>Restart</button>
        </>
    );
};

export default Header;