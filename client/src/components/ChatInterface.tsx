import { useState, useRef, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Smile } from "lucide-react";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  isCurrentUser?: boolean;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  currentUserId?: string;
  teamName?: string;
  isOnline?: boolean;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  currentUserId,
  teamName = "Team Chat",
  isOnline = true,
}: ChatInterfaceProps) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage("");
      console.log('Message sent:', newMessage); //todo: remove mock functionality
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    }
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <Card className="flex flex-col h-[500px]" data-testid="card-chat-interface">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" data-testid="text-team-name">{teamName}</h3>
          <div className="flex items-center gap-2">
            {isOnline && (
              <Badge variant="secondary" className="text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-1" />
                Online
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4" data-testid="chat-messages">
          {messages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUserId;
            const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
            
            return (
              <div 
                key={message.id} 
                className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                data-testid={`message-${message.id}`}
              >
                <div className="flex-shrink-0">
                  {showAvatar ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback className="text-xs">
                        {getInitials(message.senderName)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="h-8 w-8" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-xs ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                  {showAvatar && (
                    <div className={`text-xs text-muted-foreground mb-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
                      <span>{isCurrentUser ? 'You' : message.senderName}</span>
                      <span className="ml-2">{formatTimestamp(message.timestamp)}</span>
                    </div>
                  )}
                  
                  <div className={`
                    inline-block px-3 py-2 rounded-lg text-sm
                    ${isCurrentUser 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-20"
              data-testid="input-message"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => console.log('Add attachment')} //todo: remove mock functionality
                data-testid="button-attachment"
              >
                <Paperclip className="h-3 w-3" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6"
                onClick={() => console.log('Add emoji')} //todo: remove mock functionality
                data-testid="button-emoji"
              >
                <Smile className="h-3 w-3" />
              </Button>
            </div>
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}