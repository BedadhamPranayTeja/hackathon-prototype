import { useState } from "react";
import ChatInterface from '../ChatInterface';

export default function ChatInterfaceExample() {
  //todo: remove mock functionality
  const [messages, setMessages] = useState([
    {
      id: "1",
      senderId: "user1",
      senderName: "Alex Chen",
      text: "Hey team! Just pushed the latest changes to the repo. The ML model is looking good!",
      timestamp: "2024-03-15T10:30:00Z"
    },
    {
      id: "2",
      senderId: "user2",
      senderName: "Sarah Johnson",
      text: "Awesome! I'm working on the UI mockups. Should have them ready in an hour.",
      timestamp: "2024-03-15T10:32:00Z"
    },
    {
      id: "3",
      senderId: "current",
      senderName: "You",
      text: "Perfect! I'll start integrating the API endpoints meanwhile.",
      timestamp: "2024-03-15T10:33:00Z",
      isCurrentUser: true
    },
    {
      id: "4",
      senderId: "user3",
      senderName: "Michael Rodriguez",
      text: "The dataset preprocessing is complete. We're getting 94% accuracy on the test set! 🎉",
      timestamp: "2024-03-15T10:35:00Z"
    },
    {
      id: "5",
      senderId: "user1",
      senderName: "Alex Chen",
      text: "That's incredible! We should document this approach for the submission.",
      timestamp: "2024-03-15T10:36:00Z"
    },
    {
      id: "6",
      senderId: "current",
      senderName: "You",
      text: "I'll create the documentation. Michael, can you share the model performance metrics?",
      timestamp: "2024-03-15T10:37:00Z",
      isCurrentUser: true
    }
  ]);

  const handleSendMessage = (messageText: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: "current",
      senderName: "You",
      text: messageText,
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        currentUserId="current"
        teamName="Code Crusaders"
        isOnline={true}
      />
    </div>
  );
}