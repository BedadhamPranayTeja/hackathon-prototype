import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Hash } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  const [selectedChannel, setSelectedChannel] = useState("general");

  // Mock data for chat channels
  const channels = [
    {
      id: "general",
      name: "General",
      type: "channel",
      unreadCount: 0,
      description: "General discussion for all participants"
    },
    {
      id: "ai-challenge",
      name: "AI Innovation Challenge",
      type: "channel",
      unreadCount: 3,
      description: "Discussion for AI Innovation Challenge 2024"
    },
    {
      id: "web-dev-sprint",
      name: "Web Dev Sprint",
      type: "channel", 
      unreadCount: 1,
      description: "Discussion for Global Web Dev Sprint"
    },
    {
      id: "team-ai-innovators",
      name: "AI Innovators Team",
      type: "team",
      unreadCount: 5,
      description: "Private team chat for AI Innovators"
    },
    {
      id: "team-web-warriors",
      name: "Web Warriors Team",
      type: "team",
      unreadCount: 0,
      description: "Private team chat for Web Warriors"
    }
  ];

  const currentChannel = channels.find(channel => channel.id === selectedChannel);

  return (
    <div className="min-h-screen bg-background" data-testid="page-chat">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chat</h1>
          <p className="text-muted-foreground">
            Connect with other participants and collaborate in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Channels Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={selectedChannel === channel.id ? "secondary" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {channel.type === "channel" ? (
                            <Hash className="h-4 w-4" />
                          ) : (
                            <Users className="h-4 w-4" />
                          )}
                          <span className="truncate">{channel.name}</span>
                        </div>
                        {channel.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  {currentChannel?.type === "channel" ? (
                    <Hash className="h-5 w-5" />
                  ) : (
                    <Users className="h-5 w-5" />
                  )}
                  {currentChannel?.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentChannel?.description}
                </p>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ChatInterface
                  channelId={selectedChannel}
                  channelName={currentChannel?.name || "Chat"}
                  onSendMessage={(message) => {
                    console.log("Sending message:", message);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
