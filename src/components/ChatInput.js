import React, { useState, useContext } from 'react';
import db from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import './ChatInput.css';
import AuthContext from '../context/auth-context';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  const sendMessage = async (e) => {
    e.preventDefault();
    if (channelId) {
      await addDoc(collection(db, 'rooms', channelId, 'messages'), {
        message: input,
        timestamp: serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput('');
  };

  return (
    <div className='chatInput'>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <button type='submit' onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
