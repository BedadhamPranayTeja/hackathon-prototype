import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Users } from "lucide-react";
import TeamCard from "@/components/TeamCard";

export default function Teams() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHackathon, setSelectedHackathon] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  // Mock data for teams
  const teams = [
    {
      id: "1",
      name: "AI Innovators",
      hackathonTitle: "AI Innovation Challenge 2024",
      members: [
        {
          id: "1",
          displayName: "Alice Johnson",
          role: "Team Lead",
          avatarUrl: undefined,
          isLeader: true
        },
        {
          id: "2",
          displayName: "Bob Smith",
          role: "ML Engineer",
          avatarUrl: undefined
        },
        {
          id: "3",
          displayName: "Carol Davis",
          role: "Frontend Developer",
          avatarUrl: undefined
        }
      ],
      lookingForRoles: ["Backend Developer", "Data Scientist"],
      maxMembers: 5,
    },
    {
      id: "2",
      name: "Web Warriors",
      hackathonTitle: "Global Web Dev Sprint",
      members: [
        {
          id: "4",
          displayName: "David Wilson",
          role: "Team Lead",
          avatarUrl: undefined,
          isLeader: true
        },
        {
          id: "5",
          displayName: "Eva Brown",
          role: "Full Stack Developer",
          avatarUrl: undefined
        }
      ],
      lookingForRoles: ["UI/UX Designer", "DevOps Engineer"],
      maxMembers: 4,
    },
    {
      id: "3",
      name: "EcoTech Solutions",
      hackathonTitle: "Sustainability Hack 2024",
      members: [
        {
          id: "6",
          displayName: "Frank Miller",
          role: "Team Lead",
          avatarUrl: undefined,
          isLeader: true
        },
        {
          id: "7",
          displayName: "Grace Lee",
          role: "Environmental Engineer",
          avatarUrl: undefined
        },
        {
          id: "8",
          displayName: "Henry Taylor",
          role: "Mobile Developer",
          avatarUrl: undefined
        },
        {
          id: "9",
          displayName: "Ivy Chen",
          role: "Data Analyst",
          avatarUrl: undefined
        }
      ],
      lookingForRoles: [],
      maxMembers: 4,
    }
  ];

  const hackathons = [
    "AI Innovation Challenge 2024",
    "Global Web Dev Sprint", 
    "Sustainability Hack 2024"
  ];

  const roles = [
    "Team Lead",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "ML Engineer",
    "Data Scientist",
    "UI/UX Designer",
    "Mobile Developer",
    "DevOps Engineer",
    "Data Analyst"
  ];

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         team.hackathonTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesHackathon = selectedHackathon === "all" || team.hackathonTitle === selectedHackathon;
    
    const matchesRole = selectedRole === "all" || 
                       team.lookingForRoles.includes(selectedRole) ||
                       team.members.some(member => member.role === selectedRole);
    
    return matchesSearch && matchesHackathon && matchesRole;
  });

  const handleJoinRequest = (id: string) => {
    console.log("Join request for team:", id);
  };

  const handleMessage = (id: string) => {
    console.log("Message team:", id);
  };

  const handleViewTeam = (id: string) => {
    console.log("View team details:", id);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-teams">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Teams</h1>
          <p className="text-muted-foreground">
            Find and join teams for your hackathons
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedHackathon} onValueChange={setSelectedHackathon}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All hackathons" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All hackathons</SelectItem>
                      {hackathons.map(hackathon => (
                        <SelectItem key={hackathon} value={hackathon}>
                          {hackathon}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="ml-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {filteredTeams.length} team{filteredTeams.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard
              key={team.id}
              {...team}
              onJoinRequest={handleJoinRequest}
              onMessage={handleMessage}
              onViewTeam={handleViewTeam}
            />
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No teams match your current filters.
            </p>
            <Button variant="outline">
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
