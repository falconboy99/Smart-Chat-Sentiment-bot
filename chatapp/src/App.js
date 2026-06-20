import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('newMessage', (message) => {
      setMessages((currentMessages) => [
        {
          id: `${Date.now()}-${message.text}-${message.aiResponse}`,
          ...message,
        },
        ...currentMessages,
      ]);
    });

    socket.on('connect_error', () => {
      setError('Realtime connection unavailable. You can still send messages.');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText || isSending) {
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      if (!data?.aiResponse) {
        throw new Error('Invalid response');
      }

      setText('');
    } catch (_error) {
      setError('Unable to send message right now.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <p className="eyebrow">Smart Chat Sentiment Bot</p>
        <h1>Ask a question and inspect the bot&apos;s reply sentiment.</h1>
        <p className="hero-copy">
          This UI talks to the Express backend at <strong>/chat</strong> and shows each response with a
          sentiment label.
        </p>
      </section>

      <section className="chat-panel">
        <form className="composer" onSubmit={handleSubmit}>
          <label className="composer-label" htmlFor="chat-input">
            Message
          </label>
          <textarea
            id="chat-input"
            className="composer-input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type something like: hello this is great"
            rows="4"
          />
          <button className="send-button" type="submit" disabled={isSending || !text.trim()}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
          {error ? <p className="error-message">{error}</p> : null}
        </form>

        <div className="message-list">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>No messages yet.</p>
              <span>Send your first prompt to see the API response here.</span>
            </div>
          ) : (
            messages.map((message) => (
              <article className="message-card" key={message.id}>
                <div className="message-row">
                  <span className="message-label">You</span>
                  <p>{message.text}</p>
                </div>
                <div className="message-row response-row">
                  <span className="message-label">Bot</span>
                  <p>{message.aiResponse}</p>
                </div>
                <span className={`sentiment-pill sentiment-${message.sentiment}`}>
                  {message.sentiment}
                </span>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
