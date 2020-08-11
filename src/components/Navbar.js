import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    gameid: {
        fontSize: "1.5rem",
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Navbar(props) {
    const { gameId } = props
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Game Id copied!
                </Alert>
            </Snackbar>
            <AppBar position="static">
                <Toolbar className={classes.toolbar}>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <CopyToClipboard text={gameId} onCopy={() => setOpen(true)}>

                        {/* <Typography variant="h6" className={classes.title}>
                            <Button color="inherit">Game ID - {props.gameId}</Button>
                        </Typography> */}
                        <Button color="inherit" className={classes.gameid}>
                            Game ID - {gameId}
                        </Button>

                    </CopyToClipboard>
                    {/* <Button color="inherit">Login</Button> */}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
