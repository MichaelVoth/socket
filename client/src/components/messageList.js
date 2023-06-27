import React from 'react';

function MessageList({ messages }) {
    console.log(messages);
    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>
                    {message.isNewUser ? (
                        <em>{message.text}</em>
                    ) : (
                        <>
                            <strong>{message.name}:</strong> {message.message}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
}

export default MessageList;
