import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chatbot.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faRobot } from '@fortawesome/free-solid-svg-icons';

function Chatbot() {
  const [userQuestion, setUserQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState('');

  const askQuestion = async () => {
    if (!userQuestion) {
      setError('Please ask a question.');
      return;
    }

    try {
      setError('');

      const conversationHistory = conversation.map(
        (entry) => entry.user + '\n' + entry.chatbot
      ).join('\n');
      const prompt = conversationHistory + '\nUser: ' + userQuestion + '\n';

      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions',
        {
          prompt,
          max_tokens: 200,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const chatbotResponse = openaiResponse.data.choices[0].text;

      const newEntry = {
        user: userQuestion,
        chatbot: chatbotResponse,
      };

      setConversation([...conversation, newEntry]);
      setUserQuestion('');
    } catch (error) {
      setError('An error occurred.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      askQuestion();
    }
  };

  return (
    <div className="container-center">
      <div className="conversation-history">
        {conversation.map((entry, index) => (
          <div key={index} className="conversation-entry">
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
      </div>
      <div className="user-input">
        <input
          type="text"
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          onKeyPress={handleKeyPress} 
          placeholder={error || "Type your question here"}
          className={`wider-input ${error ? 'error-border' : ''}`}
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={askQuestion}
        />
      </div>
    </div>
  );
}

export default Chatbot;
