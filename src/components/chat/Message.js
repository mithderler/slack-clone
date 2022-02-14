import React from 'react';
import './Message.css';

function Message({ message, timestamp, user, userImage }) {
  const convertTimestampToHour = (timestamp) => {
    const date = new Date(timestamp?.toDate());
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const timeStr = `${hours}:${minutes} ${ampm}`;
    return timeStr;
  };
  return (
    <div className='message'>
      <img className='message__user--image' src={userImage} alt='user' />
      <div className='message__info'>
        <div className='message__info--top'>
          <span className='message__user--name'>{user}</span>
          <span className='message__timestamp'>
            {convertTimestampToHour(timestamp)}
          </span>
        </div>
        <p className='message__output'>{message}</p>
      </div>
    </div>
  );
}

export default Message;
