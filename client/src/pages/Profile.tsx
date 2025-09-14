import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, MapPin, Calendar, Trophy, Code, Users, Edit, Save } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about AI and machine learning. Love building innovative solutions that make a difference.",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "Python", "Machine Learning", "TypeScript"],
    experience: "5+ years",
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    website: "johndoe.dev"
  });

  const stats = {
    hackathonsParticipated: 12,
    hackathonsWon: 3,
    projectsSubmitted: 8,
    teamsJoined: 5
  };

  const recentAchievements = [
    {
      id: "1",
      title: "1st Place - AI Innovation Challenge 2024",
      description: "Won with AI-Powered Healthcare Assistant",
      date: "2024-03-17",
      type: "win"
    },
    {
      id: "2", 
      title: "2nd Place - Global Web Dev Sprint",
      description: "Real-time Collaboration Platform",
      date: "2024-04-22",
      type: "win"
    },
    {
      id: "3",
      title: "Top 10 - Sustainability Hack 2024",
      description: "Carbon Footprint Tracker",
      date: "2024-05-12",
      type: "achievement"
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile data to backend
    console.log("Saving profile:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset form data
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !profileData.skills.includes(skill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleSkillRemove = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-profile">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and showcase your achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="" alt={profileData.name} />
                    <AvatarFallback className="text-2xl">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{profileData.name}</CardTitle>
                <p className="text-muted-foreground">{profileData.location}</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Photo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.experience} experience</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.hackathonsParticipated}</div>
                    <div className="text-sm text-muted-foreground">Hackathons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.hackathonsWon}</div>
                    <div className="text-sm text-muted-foreground">Wins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.projectsSubmitted}</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.teamsJoined}</div>
                    <div className="text-sm text-muted-foreground">Teams</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>About</CardTitle>
                  {!isEditing && (
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">{profileData.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="cursor-pointer">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-2 hover:text-destructive"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="mt-4">
                    <Input
                      placeholder="Add a skill..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        {achievement.type === "win" ? (
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <Code className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
