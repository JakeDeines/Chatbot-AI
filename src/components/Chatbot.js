import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faRobot } from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState('');
  const conversationEndRef = useRef(null);
  const messageRefs = useRef([]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('focused', entry.isIntersecting);
      });
    }, options);

    messageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      messageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [conversation]);

  const askQuestion = async () => {
    if (!userQuestion.trim()) {
      setError('Please ask me a question to begin.');
      return;
    }

    setError('');

    try {
      const conversationHistory = conversation
        .map((entry) => `User: ${entry.user}\nChatbot: ${entry.chatbot}`)
        .join('\n');

      const prompt = `${conversationHistory}\nUser: ${userQuestion}\nChatbot:`;

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
        { prompt, max_tokens: 200 },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const chatbotResponse = openaiResponse.data.choices[0].text.trim();

      setConversation((prev) => [
        ...prev,
        { user: userQuestion, chatbot: chatbotResponse },
      ]);
      setUserQuestion('');
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askQuestion();
  };

  return (
    <div className="chat-background">
      <div className="container-center">
        <div className="conversation-history">
          {conversation.map((entry, index) => (
            <div
              key={index}
              className="conversation-entry"
              ref={(el) => (messageRefs.current[index] = el)}
            >
              <div className="card">
                <div className="user-response">
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  {entry.user}
                </div>
                <div className="chatbot-response">
                  <FontAwesomeIcon icon={faRobot} className="icon" />
                  {entry.chatbot}
                </div>
              </div>
            </div>
          ))}
          <div ref={conversationEndRef} />
        </div>

        <form className="user-input" onSubmit={handleSubmit}>
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => {
              setUserQuestion(e.target.value);
              if (error) setError('');
            }}
            placeholder="Type your question here..."
            className={error ? 'error-border' : ''}
          />
         <button type="submit" className="search-button" aria-label="Submit Question">
  <FontAwesomeIcon icon={faSearch} className="search-icon" />
</button>

        </form>

        {/*  NEW: Show visible error message under input */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="login-button-container">
          <a href="/login" className="guest-link">
            ← Return to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
