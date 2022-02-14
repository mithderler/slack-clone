import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  getChannelDetails,
  getChannelMessages,
} from '../../firebase/firestore-fn';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui';
import Message from './Message';
import SlateTextEditor from './SlateTextEditor';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Backdrop from '../containers/Backdrop';
import './Chat.css';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

function Chat() {
  const [enteredText, setEnteredText] = useState(initialValue);
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelMessages, setChannelMessages] = useState([]);
  const [error, setError] = useState();
  const { channelId } = useParams();

  const isSidebarHidden = useSelector((state) => state.ui.isSidebarHidden);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe, unsubscribe2;
    if (channelId) {
      unsubscribe = getChannelDetails(channelId, setChannelDetails);
      unsubscribe2 = getChannelMessages(
        channelId,
        setChannelMessages,
        setError
      );
    }

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [channelId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [channelMessages]);

  const showSidebarHandler = () => {
    dispatch(uiActions.showSidebar());
  };

  const convertDateToStr = (messageDate) => {
    const dayName = messageDate.toLocaleString('en-EN', { weekday: 'long' });
    const monthName = messageDate.toLocaleString('en-EN', { month: 'long' });
    const dayNo = messageDate.getDate();
    const dateStr = `${dayName}, ${monthName} ${dayNo}${
      dayNo === 1 ? 'st' : dayNo === 2 ? 'nd' : 'th'
    }`;

    const today = new Date(Date.now()).toDateString();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const yesterday = new Date(Date.now() - oneDayInMs).toDateString();
    const messageDay = messageDate.toDateString();

    const label =
      messageDay === today
        ? 'Today'
        : messageDay === yesterday
        ? 'Yesterday'
        : dateStr;
    return label;
  };

  let oldMessageDate = '';
  const getDayDivider = (timestamp) => {
    const messageDate = new Date(timestamp?.toDate());
    const messageDateStr = messageDate.toDateString();
    if (oldMessageDate !== messageDateStr) {
      oldMessageDate = messageDateStr;

      return (
        <div className='message-list__day-divider'>
          <div className='message-list__day-divider__line'></div>
          <div className='message-list__day-divider__label'>
            <span>{convertDateToStr(messageDate)}</span>
            <ExpandMoreIcon fontSize='small' />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {!isSidebarHidden && window.innerWidth < 585 && <Backdrop />}
      <div className='chat'>
        <div className='chat__header'>
          <div className='chat__channel--name'>
            {isSidebarHidden && (
              <div
                className='chat__sidebar-menu--icon-container'
                onClick={showSidebarHandler}
              >
                <ReceiptOutlinedIcon className='chat__sidebar-menu--icon' />
              </div>
            )}
            <h4>
              <strong># {channelDetails?.name}</strong>
              <ExpandMoreIcon fontSize='small' />
            </h4>
          </div>
          <div className='chat__header--right'>
            <p className='chat__header--info'>
              <InfoIcon className='chat__header--info-icon' />
              Details
            </p>
          </div>
        </div>
        {channelMessages.map(({ message, timestamp, user, userImage }) => {
          return (
            <div key={timestamp}>
              {getDayDivider(timestamp)}

              <Message
                user={user}
                userImage={userImage}
                message={message}
                timestamp={timestamp}
              />
            </div>
          );
        })}
        <div className='chat__editor'>
          <SlateTextEditor
            value={enteredText}
            setValue={setEnteredText}
            channelId={channelId}
            channelName={channelDetails?.name}
          />
        </div>
        <div ref={messagesEndRef} />
      </div>
    </>
  );
}

export default Chat;
