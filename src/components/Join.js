import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { ReactComponent as ChessIcon } from '../chess-icon.svg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SvgIcon from '@material-ui/core/SvgIcon';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        flexDirection: "column"
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    iconContainer: {
        '& > svg': {
            margin: theme.spacing(2),
        },
    },
}));

function Icon(props) {
    return (
        <SvgIcon {...props}>
            <ChessIcon />
        </SvgIcon>
    );
}

export default function SignIn(props) {
    const classes = useStyles();
    const [gameId, setGameId] = useState('');

    const handleCreateGame = () => {
        const newGameId = Math.floor((Math.random() * 1000000))
        props.history.push(`/game/${newGameId}/w`)
    }

    const handleJoinGame = () => {
        props.history.push(`/game/${gameId}/b`)
    }


    const handleChange = (event) => {
        setGameId(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.iconContainer}>
                    <Icon style={{ fontSize: 100 }} />
                </div>

                <Button fullWidth className={classes.submit} variant="contained" color="primary" onClick={() => handleCreateGame()}>
                    Create Game
                </Button>
                <Typography component="h1" variant="h5">
                    OR
                </Typography>
                <form className={classes.form} noValidate onSubmit={() => handleJoinGame()}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Game ID"
                        name="gameID"
                        value={gameId}
                        onChange={handleChange}
                        autoFocus
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.submit}
                    >
                        Join Game
                    </Button>
                </form>
            </div>

        </Container>
    );
}