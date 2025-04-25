import React, { useState, useRef } from "react";
import './style.css';


const MockInterview = () => {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Welcome to the AI Mock Interview!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const addMessage = (text, sender) => {
    setMessages((prev) => [...prev, { sender, text }]);
    setTimeout(scrollToBottom, 100);
  };

  const addTypingIndicator = () => {
    const typing = { sender: "AI", typing: true };
    setMessages((prev) => [...prev, typing]);
    scrollToBottom();
    return typing;
  };

  const removeTypingIndicator = () => {
    setMessages((prev) => prev.filter((m) => !m.typing));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    addMessage(userMsg, "U");
    setInput("");
    setLoading(true);
    const typing = addTypingIndicator();

    try {
      const response = await generateResponse(userMsg);
      removeTypingIndicator();
      addMessage(response, "AI");
    } catch (err) {
      removeTypingIndicator();
      addMessage(`Error: ${err.message}`, "AI");
    } finally {
      setLoading(false);
    }
  };

  const generateResponse = async (prompt) => {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAGeCLSPyS8TE0eMIIzSpygJ9Yt-eUkaII`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (!res.ok) throw new Error("Error generating response");

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  };

  return (
    <div className="mock-container">
  <header className="mock-header">
    <h1 className="mock-h1">💬 Mock Interview</h1>
    <p className="subtitle">Prepare yourself with advanced AI model</p>
  </header>

  <div className="chat-container">
    <div className="chat-messages" ref={chatRef}>
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`message ${msg.sender === "U" ? "user-message" : ""}`}
        >
          <div
            className={`mock-avatar ${msg.sender === "U" ? "user-avatar" : ""}`}
          >
            {msg.sender === "U" ? "U" : "AI"}
          </div>
          <div className="message-content">
            {msg.typing ? (
              <div className="typing-indicator">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            ) : (
              msg.text
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="input-container">
      <form className="input-form" onSubmit={handleSubmit}>
        <textarea className="mock-textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          rows={1}
          required
          style={{ height: "auto" }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        ></textarea>
        <button className="mock-btn" type="submit" disabled={loading}>
          Send
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default MockInterview;
