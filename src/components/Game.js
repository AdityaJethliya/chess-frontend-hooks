import React, { useState, useEffect } from 'react'
import Chessboard from "chessboardjsx";
import io from "socket.io-client";

import useGameState from '../hooks/useGameState'
import Chat from './Chat'
import Navbar from './Navbar'

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

// import MenuIcon from '@material-ui/icons/Menu';
const ENDPOINT = "http://localhost:5000/"
const socket = io(ENDPOINT);


const useStyles = makeStyles((theme) => ({
    board: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },

}))

function Game(props) {
    const classes = useStyles();
    const [gameStarted, setGameStarted] = useState(false)
    const { gameId, color } = props
    const { fen, OpponentMove, onDrop, onMouseOverSquare, onMouseOutSquare, squareStyles, dropSquareStyle, onDragOverSquare, onSquareClick, onSquareRightClick } = useGameState({ socket, gameId, color })


    useEffect(() => {
        socket.emit('join', { id: gameId, name: "something" }, (error) => {
            if (error) {
                alert(error);
            }
        });
        if (color === 'b') {
            socket.emit('startgame', { gameId });
        }
        socket.on('startgame', () => {
            setGameStarted(true)
        })
        socket.on('position', ({ move }) => {
            OpponentMove(move)
        });
        // socket.on('message', message => {
        //     this.setState({ messages: [...this.state.messages, message] });
        // });

    }, [ENDPOINT]);

    return (
        <div>
            <Navbar gameId={gameId} />
            <Container className={classes.board} fixed>
                <div style={{ width: "480px", height: "480px" }}>
                    {gameStarted ?
                        <Chessboard
                            id="humanVsHuman"
                            width={480}
                            position={fen}
                            // onDrop={onDrop}
                            onMouseOverSquare={onMouseOverSquare}
                            onMouseOutSquare={onMouseOutSquare}
                            boardStyle={{
                                borderRadius: "5px",
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                            }}
                            squareStyles={squareStyles}
                            // dropSquareStyle={dropSquareStyle}
                            // onDragOverSquare={onDragOverSquare}
                            onSquareClick={onSquareClick}
                            onSquareRightClick={onSquareRightClick}
                            orientation={color === 'w' ? "white" : "black"}
                            draggable={false}
                        />
                        : <h1>Waiting for other player</h1>}
                </div>
            </Container>
            <Chat socket={socket} />
        </div>
    )
}

export default Game
