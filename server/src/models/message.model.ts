import { getRepository } from 'typeorm';
import Message from '../entity/Message';

const colors = ['#e85d04', '#b5e48c', '#507DBC', '#D6CFC7', '#877F7D'];

const createMessage = (msg: string, id: number, username: string, color: number) => {
  const bgColor = colors[color];
  const today = new Date().toString();
  const message = {
    message: msg,
    user: { id },
    createdAt: today,
    bgColor: bgColor || 'white',
    type: 'user',
    username,
  };
  const messageRepo = getRepository(Message);
  const res = messageRepo.save({
    ...message,
  });

  return res;
};

const getMessages = () => {
  const messageRepo = getRepository(Message);
  const messages = messageRepo.find({
    take: 20,
  });

  return messages;
};

export default {
  createMessage,
  getMessages,
};
