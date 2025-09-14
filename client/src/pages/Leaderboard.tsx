import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Medal, Award } from "lucide-react";
import LeaderboardComponent from "@/components/Leaderboard";

export default function Leaderboard() {
  const [selectedHackathon, setSelectedHackathon] = useState("ai-challenge");

  // Mock data for leaderboard entries
  const leaderboardData = {
    "ai-challenge": [
      {
        rank: 1,
        teamName: "Neural Nexus",
        score: 95.5,
        members: [
          {
            id: "1",
            displayName: "Alice Johnson",
            avatarUrl: undefined,
            contributionScore: 98
          },
          {
            id: "2", 
            displayName: "Bob Smith",
            avatarUrl: undefined,
            contributionScore: 93
          }
        ],
        submissionTitle: "AI-Powered Healthcare Assistant",
        tags: ["AI", "Healthcare", "Machine Learning"]
      },
      {
        rank: 2,
        teamName: "Data Dynamos",
        score: 92.3,
        members: [
          {
            id: "3",
            displayName: "Carol Davis",
            avatarUrl: undefined,
            contributionScore: 94
          },
          {
            id: "4",
            displayName: "David Wilson",
            avatarUrl: undefined,
            contributionScore: 90
          }
        ],
        submissionTitle: "Predictive Analytics Platform",
        tags: ["Data Science", "Analytics", "Python"]
      },
      {
        rank: 3,
        teamName: "Code Crusaders",
        score: 89.7,
        members: [
          {
            id: "5",
            displayName: "Eva Brown",
            avatarUrl: undefined,
            contributionScore: 91
          },
          {
            id: "6",
            displayName: "Frank Miller",
            avatarUrl: undefined,
            contributionScore: 88
          }
        ],
        submissionTitle: "Smart City Optimization",
        tags: ["IoT", "Smart Cities", "Optimization"]
      }
    ],
    "web-dev-sprint": [
      {
        rank: 1,
        teamName: "React Rangers",
        score: 96.2,
        members: [
          {
            id: "7",
            displayName: "Grace Lee",
            avatarUrl: undefined,
            contributionScore: 97
          },
          {
            id: "8",
            displayName: "Henry Taylor",
            avatarUrl: undefined,
            contributionScore: 95
          }
        ],
        submissionTitle: "Real-time Collaboration Platform",
        tags: ["React", "WebRTC", "Real-time"]
      },
      {
        rank: 2,
        teamName: "Node Ninjas",
        score: 93.8,
        members: [
          {
            id: "9",
            displayName: "Ivy Chen",
            avatarUrl: undefined,
            contributionScore: 94
          },
          {
            id: "10",
            displayName: "Jack Anderson",
            avatarUrl: undefined,
            contributionScore: 93
          }
        ],
        submissionTitle: "E-commerce Microservices",
        tags: ["Node.js", "Microservices", "E-commerce"]
      }
    ],
    "sustainability-hack": [
      {
        rank: 1,
        teamName: "EcoTech Solutions",
        score: 94.1,
        members: [
          {
            id: "11",
            displayName: "Kate Wilson",
            avatarUrl: undefined,
            contributionScore: 95
          },
          {
            id: "12",
            displayName: "Liam O'Connor",
            avatarUrl: undefined,
            contributionScore: 93
          }
        ],
        submissionTitle: "Carbon Footprint Tracker",
        tags: ["Sustainability", "Mobile", "Environmental"]
      }
    ]
  };

  const hackathons = [
    { id: "ai-challenge", name: "AI Innovation Challenge 2024" },
    { id: "web-dev-sprint", name: "Global Web Dev Sprint" },
    { id: "sustainability-hack", name: "Sustainability Hack 2024" }
  ];

  const currentLeaderboard = leaderboardData[selectedHackathon as keyof typeof leaderboardData] || [];

  return (
    <div className="min-h-screen bg-background" data-testid="page-leaderboard">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h1 className="text-3xl font-bold">Leaderboard</h1>
          </div>
          <p className="text-muted-foreground">
            See how teams are performing across different hackathons
          </p>
        </div>

        {/* Hackathon Selector */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Hackathon:</label>
              <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select a hackathon" />
                </SelectTrigger>
                <SelectContent>
                  {hackathons.map((hackathon) => (
                    <SelectItem key={hackathon.id} value={hackathon.id}>
                      {hackathon.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {hackathons.find(h => h.id === selectedHackathon)?.name} Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentLeaderboard.length > 0 ? (
              <LeaderboardComponent 
                entries={currentLeaderboard}
                title=""
              />
            ) : (
              <div className="text-center py-12">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No leaderboard data available for this hackathon yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
