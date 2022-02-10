import React, { useState } from 'react';
import db from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import './ChatInput.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/config';
const auth = getAuth(app);

function ChatInput({ channelName, channelId }) {
  const [user, loading, error] = useAuthState(auth);
  const [input, setInput] = useState('');

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
