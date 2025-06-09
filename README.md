# 🤖 Chatbot-AI

![Hosted on AWS Amplify](https://img.shields.io/badge/Hosted%20on-AWS%20Amplify-orange?style=for-the-badge&logo=aws-amplify)
![Stars](https://img.shields.io/github/stars/JakeDeines/Chatbot-AI?style=for-the-badge&logo=github)
![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Powered by OpenAI](https://img.shields.io/badge/Powered%20by-OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

## Overview
A sleek, responsive AI chatbot web application built with React, AWS Amplify for authentication, and OpenAI for real-time AI responses. Designed with a clean, Amazon-inspired UI and optimized for both desktop and mobile use.

---
## 🌐 Live Demo

👉 [View the deployed app](https://main.d3aa51l1wq81s7.amplifyapp.com)


---

## ✨ Features

🔐 **Secure Login with AWS Cognito**  
Users can sign up and log in through a secure Amplify-hosted login page. Sessions are handled automatically and passwords are stored safely using AWS services.

🎨 **Dark Theme Inspired by Amazon**  
The app uses Amplify’s default UI components with a custom dark theme and gold highlights to give it a sleek, clean look.

🤖 **Real-Time Chat Using OpenAI's API**  
The chatbot connects to OpenAI’s language model API to generate smart, real-time responses. Messages stream in as they’re received to keep things interactive.

📱 **Mobile-Friendly**  
The layout works great on phones, tablets, and desktops — it resizes automatically without breaking.

🧠 **Easy to Add New Features**  
The app is built in React with a simple layout, so it’s easy to update or expand later (like saving chat history or adding a database).

---

## 📸 Screenshots

### 🔐 Login Page (Desktop)
![Login Desktop](./assets/Chatbot_login_desktop.png)

### 📱 Login Page (Mobile)
![Login Mobile](./assets/Chatbot_login_mobile.png)

### 💬 Chat Examples

#### Search Prompt
![Chat Search](./assets/Chatbot_chat_search.png)

#### Prompt Example 1
![Chat Action 1](./assets/Chatbot_chat_action1.png)

#### Prompt Example 2
![Chat Action 2](./assets/Chatbot_chat_action2.png)

#### Prompt Example 3
![Chat Action 3](./assets/Chatbot_chat_action3.png)

---

## 🛠 Tech Stack

- **React** – Frontend UI framework
- **AWS Amplify** – Handles authentication, hosting, and deployment
- **Amazon Cognito** – Manages user sign-up, login, and sessions
- **OpenAI API** – Powers real-time AI chat responses
- **Axios** – Used to send messages to the OpenAI API
- **React Router** – Handles in-app navigation
- **Amplify UI Components** – Prebuilt Amazon-style components for forms and layout
- **Font Awesome** – Icons used throughout the UI
- **CSS** – Custom styling and responsive layout

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/JakeDeines/Chatbot-AI.git
cd chatbot-ai
npm install
npm start
```


---

## 🧩 Future Improvements

- Save chat responses to a database
- Add user chat history view
- Integrate search results or external data
- Add a "favorite" or "like" system to save key replies
