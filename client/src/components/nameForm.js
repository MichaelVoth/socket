import React, { useState } from 'react';

function NameForm({ socket, onNewUser }) {
    const [name, setName] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        socket.emit('new_user', name);
        
        onNewUser(name);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <button type="submit">Join Chat</button>
        </form>
    );
}

export default NameForm;
