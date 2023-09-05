import React, { useRef, useState, useEffect } from 'react';
import io from 'socket.io-client';
import style from './Chat.module.css'

const socket = io.connect('http://localhost:3001'); // Criar o socket fora do componente

export default function Chat() {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const username = 'david'; // Nome de usuário simulado

  useEffect(() => {
    socket.emit('set_username', username);

    socket.on('receive_message', (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off('receive_message');
  }, []);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit('message', message);
    clearInput();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  return (
    <div>
      <div className={style['chat-container']}>
      <h2>Support Chat</h2>
      <div className={style['chat-body']}>
        <div className={style['message-container']}>

        {messageList.map((message, index) => (
        <p key={index}>
          {message.author}: {message.text}
        </p>
      ))}
        </div>
        <div className={style['chat-footer']}>

        <input type="text" ref={messageRef} placeholder='Mensagem' />
      <button onClick={handleSubmit}>Enviar</button>


        </div>

      

      </div>
      
      </div>
      
    </div>
  );
}
