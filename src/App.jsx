import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations.js";

const initialBoardState = [[null, null, null], [null, null, null], [null, null, null]];

function getActivePlayer(gameTurns) {
    let activePlayer = "X";
    if(gameTurns.length > 0 && gameTurns[0].Player === "X") {
        activePlayer = "O";
    }
    return activePlayer;
}

function App() {
    const [playerNames, setPlayerNames] = useState({
        X: "Player 1",
        O: "Player 2"
    });
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = getActivePlayer(gameTurns);
    const BoardState = [...initialBoardState.map(row => [...row])];
    let winner;

    gameTurns.forEach(turn => {
        BoardState[turn.square.row][turn.square.col] = turn.Player;
    });

    for(const combination of WINNING_COMBINATIONS) {
        const firstSymbol = BoardState[combination[0].row][combination[0].column];
        const secondSymbol = BoardState[combination[1].row][combination[1].column];
        const thirdSymbol = BoardState[combination[2].row][combination[2].column];

        if(firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
            winner = playerNames[firstSymbol];
            break;
        }
    }

    const updateGameboard = (rowIndex, colIndex) => {
        setGameTurns(prev => {
            const currentPlayer = getActivePlayer(prev);
            let newState = [{ square: { row: rowIndex, col: colIndex }, Player: currentPlayer }, ...prev];
            return newState;
        });
    };

    const handleRestart = () => {
        setGameTurns([]);
    };

    const NotifyPlayerNameChange = (symbol, playerName) => {
        setPlayerNames(prev => ({
            ...prev,
            [symbol]: playerName
        }));
    };

    let isItADraw = !winner && gameTurns.length === 9;

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player InitialName={playerNames.X} Symbol="X" isActive={activePlayer === "X"} notifyNameChange={NotifyPlayerNameChange} />
                    <Player InitialName={playerNames.O} Symbol="O" isActive={activePlayer === "O"} notifyNameChange={NotifyPlayerNameChange} />
                </ol>
                <GameBoard BoardState={BoardState} OnTileClick={updateGameboard} />
                {(winner || isItADraw) && (
                    <div id="game-over">
                        <h2>Game Over!</h2>
                        { winner && <p>{winner} has won!</p> }
                        { !winner && <p>It is a draw!</p> }
                        <button onClick={handleRestart}>Rematch</button>
                    </div>
                )}
            </div>
            <Log GameTurns={gameTurns} />
        </main>
    );
}

export default App
