import {
  doc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import db from './config';
import * as constants from '../utils/constants/Firestore';

export const getChannelList = (setChannels) => {
  return onSnapshot(
    collection(db, constants.FIRESTORE_COLLECTION_ROOMS),
    (snapshot) => {
      const channels = [];
      snapshot.forEach((doc) => {
        channels.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setChannels(channels);
    }
  );
};

export const getChannelDetails = (channelId, setChannelDetails) => {
  return onSnapshot(
    doc(db, constants.FIRESTORE_COLLECTION_ROOMS, channelId),
    (document) => {
      setChannelDetails(document.data());
    }
  );
};

export const getChannelMessages = (channelId, setChannelMessages, setError) => {
  const q = query(
    collection(
      db,
      constants.FIRESTORE_COLLECTION_ROOMS,
      channelId,
      constants.FIRESTORE_COLLECTION_MESSAGES
    ),
    orderBy('timestamp', 'asc')
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setChannelMessages(messages);
    },
    (error) => {
      setError(error.message);
    }
  );
};
