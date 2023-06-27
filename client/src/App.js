import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import NameForm from './components/nameForm';
import MessageForm from './components/messageForm';
import MessageList from './components/messageList';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [socket] = useState(() => io(':8000'));

  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('Welcome', data => console.log(data));
    socket.on('new_message', message => {
      setMessages(oldMessages => [...oldMessages, message]);
    });
    console.log('Latest Messages', messages);
    return () => {
      socket.off("Welcome");
      socket.off("new_message");
    };
  }, [socket, messages]); // add 'messages' to the dependency array
  
  const handleNewUser = newName => {
    setName(newName);
  };

  return (
    <div className="App">
      <Navbar />
      <MessageList messages={messages} />
      {name ? (
        <MessageForm socket={socket} name={name} />
      ) : (
        <NameForm socket={socket} onNewUser={handleNewUser} />
      )}
    </div>
  );
}

export default App;
