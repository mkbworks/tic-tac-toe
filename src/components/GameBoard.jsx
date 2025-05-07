function GameBoard({ BoardState, OnTileClick }) {
    return (
        <ol id="game-board">
            {BoardState.map((row, rowIndex) => (
                <li key={`Row-${rowIndex}`}>
                    <ol>
                        {row.map((col, colIndex) => (
                            <li key={`Row-${rowIndex}-Column-${colIndex}`}>
                                <button onClick={() => OnTileClick(rowIndex, colIndex)} disabled={col !== null}>
                                    {col}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

export default GameBoard;
