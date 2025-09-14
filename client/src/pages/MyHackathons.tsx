import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin, Trophy } from "lucide-react";
import HackathonCard from "@/components/HackathonCard";

export default function MyHackathons() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock data for user's hackathons
  const myHackathons = {
    upcoming: [
      {
        id: "1",
        title: "AI Innovation Challenge 2024",
        description: "Build the next generation of AI applications that solve real-world problems.",
        startAt: "2024-03-15T09:00:00Z",
        endAt: "2024-03-17T18:00:00Z",
        tags: ["AI", "Machine Learning", "Innovation"],
        participantCount: 245,
        location: "San Francisco, CA",
        imageUrl: undefined,
        status: "registered"
      },
      {
        id: "2",
        title: "Global Web Dev Sprint",
        description: "Create innovative web applications using modern frameworks.",
        startAt: "2024-04-20T10:00:00Z",
        endAt: "2024-04-22T20:00:00Z",
        tags: ["Web Dev", "React", "Node.js"],
        participantCount: 189,
        location: "Virtual",
        imageUrl: undefined,
        status: "registered"
      }
    ],
    ongoing: [
      {
        id: "3",
        title: "Sustainability Hack 2024",
        description: "Develop technology solutions for environmental challenges.",
        startAt: "2024-02-10T08:00:00Z",
        endAt: "2024-02-12T17:00:00Z",
        tags: ["Sustainability", "Environment"],
        participantCount: 156,
        location: "Austin, TX",
        imageUrl: undefined,
        status: "participating"
      }
    ],
    completed: [
      {
        id: "4",
        title: "Mobile App Innovation",
        description: "Create the next breakthrough mobile application.",
        startAt: "2024-01-15T09:00:00Z",
        endAt: "2024-01-17T18:00:00Z",
        tags: ["Mobile", "iOS", "Android"],
        participantCount: 124,
        location: "New York, NY",
        imageUrl: undefined,
        status: "completed",
        result: "2nd Place"
      }
    ]
  };

  const handleApply = (id: string) => {
    console.log("Apply to hackathon:", id);
  };

  const handleViewDetails = (id: string) => {
    console.log("View hackathon details:", id);
  };

  const getStatusBadge = (status: string, result?: string) => {
    switch (status) {
      case "registered":
        return <Badge variant="secondary">Registered</Badge>;
      case "participating":
        return <Badge variant="default">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline">{result || "Completed"}</Badge>;
      default:
        return null;
    }
  };

  const currentHackathons = myHackathons[activeTab as keyof typeof myHackathons];

  return (
    <div className="min-h-screen bg-background" data-testid="page-my-hackathons">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Hackathons</h1>
          <p className="text-muted-foreground">
            Track your hackathon journey and manage your participations
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {[
            { key: "upcoming", label: "Upcoming", count: myHackathons.upcoming.length },
            { key: "ongoing", label: "Ongoing", count: myHackathons.ongoing.length },
            { key: "completed", label: "Completed", count: myHackathons.completed.length }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.key)}
              className="relative"
            >
              {tab.label}
              {tab.count > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {tab.count}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{hackathon.title}</h3>
                  {getStatusBadge(hackathon.status, hackathon.result)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {hackathon.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {hackathon.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(hackathon.startAt).toLocaleDateString()} - {new Date(hackathon.endAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{hackathon.participantCount} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{hackathon.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentHackathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No hackathons in this category yet.
            </p>
            <Button variant="outline">
              Discover Hackathons
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
