import React, { useEffect, useState } from 'react';
import moment from 'moment'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (!currentMessage) return;

    const messageData = {
      room,
      author: username,
      message: currentMessage,
      time: new Date().getTime()
    }

    socket.emit('send_message', messageData);

    setCurrentMessage('');
    setMessageList(prev => ([...prev, messageData]))
  }

  useEffect(() => {
    socket.on('receive_message', data => {
      // console.log(data)
      setMessageList(prev => ([...prev, data]))
    })
  }, [])

  return (
    <div className="chat">
      {console.log(messageList)}
        <div className="chat-header">
            <h5>Live Chat</h5>
        </div>
        <div className="chat-body">
            {messageList.map((message, idx) => {
              return (<div key={idx} className={`message${message.author === username ? ' own-message' : ''}`}>
                <div className='message-content'>
                  <div className='message-author'>{message.author}</div>
                  {message.message}
                </div>
                <div className='message-meta'>
                  {moment(message.time).fromNow()} 
                </div>
              </div>);
            })}
        </div>
        <div className="chat-footer">
            <input type="text" placeholder="Enter a message..." value={currentMessage} onChange={e => setCurrentMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat