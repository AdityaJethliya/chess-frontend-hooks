import { useState, useEffect } from 'react'
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor
const game = new Chess()
export default ({ socket, gameId, color }) => {
    const [fen, setFen] = useState("start")
    // const [dropSquareStyle, setDropSquareStyle] = useState({})
    const [squareStyles, setSquareStyles] = useState({})
    const [pieceSquare, setPieceSquare] = useState("")
    const [square, setSquare] = useState("")
    const [history, setHistory] = useState("")

    const OpponentMove = (move) => {
        game.move(move)
        setFen(game.fen())
        setHistory(game.history({ verbose: true }))
        setPieceSquare("")
    }

    const removeHighlightSquare = () => {
        setSquareStyles(squareStyling({ pieceSquare, history }))
    };

    const squareStyling = () => {
        const sourceSquare = history.length && history[history.length - 1].from;
        const targetSquare = history.length && history[history.length - 1].to;

        return {
            [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            ...(history.length && {
                [sourceSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            }),
            ...(history.length && {
                [targetSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            })
        };
    };

    // show possible moves
    const highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background:
                                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        }
                    },
                    ...squareStyling()
                };
            },
            {}
        );
        setSquareStyles({ ...squareStyles, ...highlightStyles })
    };

    // const onDrop = ({ sourceSquare, targetSquare }) => {
    //     // see if the move is legal
    //     let move = game.move({
    //         from: sourceSquare,
    //         to: targetSquare,
    //         promotion: "q" // always promote to a queen for example simplicity
    //     });

    //     // illegal move
    //     if (move === null) return;
    //     setFen(game.fen())
    //     setHistory(game.history({ verbose: true }))
    //     setSquareStyles(squareStyling())
    // };

    const onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        highlightSquare(square, squaresToHighlight);
    };

    const onMouseOutSquare = square => removeHighlightSquare(square);

    // central squares get diff dropSquareStyles
    // const onDragOverSquare = square => {
    //     setDropSquareStyle(square === "e4" || square === "d4" || square === "e5" || square === "d5"
    //         ? { backgroundColor: "cornFlowerBlue" }
    //         : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" })
    // };

    const onSquareClick = square => {
        if (game.turn() !== color) return

        setSquareStyles(squareStyling({ pieceSquare: square, history }))
        setPieceSquare(square)

        let move = game.move({
            from: pieceSquare,
            to: square,
            promotion: "q" // always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) return;
        socket.emit('move', {
            gameId, move: {
                from: pieceSquare,
                to: square,
                promotion: "q"
            }
        });
        setFen(game.fen())
        setHistory(game.history({ verbose: true }))
        setPieceSquare("")
    };

    const onSquareRightClick = square =>
        setSquareStyles({ [square]: { backgroundColor: "deepPink" } })

    return { fen, OpponentMove, onMouseOverSquare, onMouseOutSquare, squareStyles, onSquareClick, onSquareRightClick }
}

