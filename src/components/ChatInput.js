import React, { useState } from 'react';
import { useStateValue } from '../context/auth-context';
import db from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import './ChatInput.css';

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();

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
