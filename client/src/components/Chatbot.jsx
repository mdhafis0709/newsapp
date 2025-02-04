import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = ({ theme }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatContainerRef = useRef(null);
  const speechSynthesisRef = useRef(window.speechSynthesis);

  const searchKeywords = ["Latest news", "Technology", "Sports", "Entertainment", "Health", "Science"];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (message = input) => {
    if (!message.trim()) return;

    setIsLoading(true);
    const userMessage = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message });
      const botMessage = { text: response.data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
      setTimeout(() => speakText(response.data.reply), 500);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { text: "Failed to get a response. Please try again.", sender: "bot" }]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      speechSynthesisRef.current.speak(speech);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesisRef.current.speaking) {
      speechSynthesisRef.current.cancel();
    }
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all transform hover:scale-110"
      >
        🤖NewsBot
      </button>

      {isOpen && (
        <div
          className={`w-96 rounded-lg mt-2 shadow-lg overflow-hidden border relative ${theme === "light-theme" ? "bg-white text-gray-900" : "bg-gray-800 text-blue-400"}`} // Changed text color to blue in dark mode
          style={{
            backgroundImage: "url('https://img.freepik.com/premium-photo/black-dot-illustration-inside-yellow-speech-bubble-yellow-background-chat-sms-comment-message-by-3d-rendering_50039-2915.jpg?w=826')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className={`${theme === "light-theme" ? "bg-black bg-opacity-70" : "bg-gray-900 bg-opacity-70"} p-4 text-lg font-bold text-center relative`}>
            May I help you?
            <button
              onClick={toggleChatbot}
              className="absolute top-2 right-2 text-xl font-bold hover:text-red-500"
            >
              ✕
            </button>
          </div>

          <div ref={chatContainerRef} className={`h-80 overflow-y-auto font-bold py-2 px-4 ${theme === "light-theme" ? "bg-white bg-opacity-95" : "bg-gray-700 bg-opacity-95"}`}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg max-w-[100%] animate-fade-in ${
                  msg.sender === "user" ? "bg-blue-600 text-white ml-auto" : theme === "light-theme" ? "bg-blue-200 text-gray-900" : "bg-gray-600 text-blue-400" // Changed bot text color to blue in dark mode
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className={`${theme === "light-theme" ? "bg-blue-200 text-gray-900" : "bg-gray-600 text-blue-400"} p-2 rounded-lg`}>Typing...</div> {/* Changed typing text color to blue in dark mode */}
              </div>
            )}
          </div>

          <div className={`p-2 ${theme === "light-theme" ? "bg-gray-100" : "bg-gray-700"} border-t`}>
            <p className={`text-sm ${theme === "light-theme" ? "text-gray-700" : "text-blue-400"} mb-2 font-bold`}>Quick Search:</p> {/* Changed quick search text color to blue in dark mode */}
            <div className="flex flex-wrap gap-2">
              {searchKeywords.map((keyword, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(keyword)}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition-all"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div className={`flex p-2 border-t ${theme === "light-theme" ? "bg-white" : "bg-gray-800"}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className={`flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === "light-theme" ? "bg-white text-gray-900" : "bg-gray-700 text-blue-400"}`} // Changed input text color to blue in dark mode
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
            <button
              onClick={startListening}
              className="bg-green-500 text-white p-2 rounded-lg ml-2 hover:bg-green-600"
            >
              🎙️
            </button>
            <button
              onClick={stopSpeaking}
              className="bg-red-500 text-white p-2 rounded-lg ml-2 hover:bg-red-600"
            >
              🔇
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;