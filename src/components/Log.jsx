export default function Log({ GameTurns }) {
    return (
        <ol id="log">
            {GameTurns.map(turn => (
                <li key={`${turn.square.row}-${turn.square.col}`}>
                    Player {turn.Player} selected box - ({turn.square.row}, {turn.square.col}).
                </li>
            ))}
        </ol>
    );
}
