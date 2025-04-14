import React, { useEffect, useRef, useState } from "react";

const ChatPage = ({ name, role, description, slug }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `${description}`,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const formatAIMessage = (text) => {
    if (!text) return "";

    // Code blocks: ```code```
    const regexCodeBlock = /```([\s\S]*?)```/g;
    const regexList = /- (.+?)(?=\n|$)/g;
    text = text.replace(regexCodeBlock, (_, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Headings: ###, ##, #
    text = text.replace(/^### (.+)$/gm, "<h3>$1</h3>");
    text = text.replace(/^## (.+)$/gm, "<h2>$1</h2>");
    text = text.replace(/^# (.+)$/gm, "<h1>$1</h1>");

    // Horizontal rule: ---
    text = text.replace(/^---$/gm, "<hr>");

    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic: *text*
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Inline code: `code`
    text = text.replace(/`([^`\n]+)`/g, "<code>$1</code>");

    // Unordered list: - item
    text = text.replace(/(^- .+(?:\n- .+)*)/gm, (match) => {
      const items = match
        .trim()
        .split("\n")
        .map((line) => line.replace(/^- /, ""))
        .map((item) => `<li>${item}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    });

    // Ordered list: 1. item
    // text = text.replace(/(^\d+\. .+(?:\n\d+\. .+)*)/gm, (match) => {
    //   const items = match
    //     .trim()
    //     .split("\n")
    //     .map((line) => line.replace(/^\d+\. /, ""))
    //     .map((item) => `<li>${item}</li>`)
    //     .join("");
    //   return `<ol>${items}</ol>`;
    // });
    text = text.replace(regexList, (match, item) => {
      return `<ul><li>${item}</li></ul>`;
    });
    // Markdown-style links: [text](url)
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`
    );

    // Line breaks
    text = text.replace(/\n/g, "<br>");

    return text;
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const route = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/${slug}/${slug}-chat`;
      const response = await fetch(route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: 'include',
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await response.json();
      console.log(data);
      const formattedReply = formatAIMessage(data.reply);
      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: formattedReply || "Sorry, I didn't get that!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Oops! Something went wrong while connecting to the AI.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-sm text-gray-400">{role}</div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xl p-4 rounded-lg ${
              msg.sender === "user"
                ? "bg-orange-500 ml-auto text-shadow-white font-medium"
                : "bg-[#1e1e1e] mr-auto"
            }`}
          >
            {msg.sender === "ai" ? (
              <div
                className="prose prose-invert max-w-none overflow-x-scroll whitespace-pre-wrap"
                style={{ overflowX: "auto", maxWidth: "100%" }}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            ) : (
              <p className="mb-2">{msg.text}</p>
            )}

            <div className="text-xs text-gray-300 text-right">
              {msg.sender === "ai" ? name : "You"} • {msg.timestamp}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="max-w-xl p-4 rounded-lg bg-[#1e1e1e] mr-auto flex items-center gap-1">
            <div className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-[#1e1e1e] text-white p-3 rounded-lg focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-orange-500 hover:bg-orange-600 p-3 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
