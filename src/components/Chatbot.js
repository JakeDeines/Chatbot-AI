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
      rootMargin: '-45% 0px -45% 0px', // Even tighter margin vertically
      threshold: 0, // Trigger as soon as intersection occurs within margins
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
      setError('Please enter a question.');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') askQuestion();
  };

  return (
    <div className="chat-background"> {/* NEW WRAPPER HERE */}
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
  
        <div className="user-input">
          <input
            type="text"
            value={userQuestion}
            onChange={(e) => {
              setUserQuestion(e.target.value);
              if (error) setError('');
            }}
            onKeyDown={handleKeyDown}
            placeholder={error || 'Type your question here...'}
            className={error ? 'error-border' : ''}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={askQuestion}
          />
        </div>
  
        <div className="login-button-container">
          <a href="/login" className="guest-link">
            ← Return to Login
          </a>
        </div>
      </div>
    </div> /* CLOSE NEW WRAPPER HERE */
  );
};

export default Chatbot;
