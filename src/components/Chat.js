import React, { useEffect } from 'react';
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
import './Chat.css'

function App({ socket }) {
    useEffect(() => {
        // addResponseMessage('Welcome to this awesome chat!');
        socket.on('message', message =>
            addResponseMessage(message.text)
        );
    }, []);

    const handleNewUserMessage = (newMessage) => {
        // socket.emit('sendMessage', newMessage, () => { });
    };

    const handleSubmit = (message) => {
        socket.emit('sendMessage', message, () => { });
    }

    return (
        <div>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                subtitle="You can chat with the other player here"
                autofocus={false}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;