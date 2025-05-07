import { useState } from "react";

function Player({ InitialName, Symbol, isActive, notifyNameChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(InitialName);
    const toggleEditing = () => {
        if(isEditing) {
            notifyNameChange(Symbol, playerName);
        }
        setIsEditing(prev => !prev);
    };

    const handleNameChange = (event) => {
        setPlayerName(event.target.value);
    };

    return (
        <li className={isActive ? "active" : null}>
            <span className="player">
                {isEditing ? <input type="text" value={playerName} onChange={handleNameChange} required /> : <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{Symbol}</span>
            </span>
            <button onClick={toggleEditing}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}

export default Player;
