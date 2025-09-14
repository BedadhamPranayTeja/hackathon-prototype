import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Code, Upload, Eye, Edit, Trash2 } from "lucide-react";
import SubmissionForm from "@/components/SubmissionForm";

export default function Submissions() {
  const [selectedHackathon, setSelectedHackathon] = useState("ai-challenge");
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  // Mock data for submissions
  const submissions = {
    "ai-challenge": [
      {
        id: "1",
        title: "AI-Powered Healthcare Assistant",
        description: "An intelligent assistant that helps healthcare professionals with diagnosis and treatment recommendations.",
        status: "submitted",
        submittedAt: "2024-03-17T15:30:00Z",
        hackathonTitle: "AI Innovation Challenge 2024",
        teamName: "Neural Nexus",
        tags: ["AI", "Healthcare", "Machine Learning"],
        score: 95.5,
        rank: 1
      },
      {
        id: "2", 
        title: "Predictive Analytics Platform",
        description: "A comprehensive platform for predictive analytics in business intelligence.",
        status: "draft",
        submittedAt: null,
        hackathonTitle: "AI Innovation Challenge 2024",
        teamName: "Data Dynamos",
        tags: ["Data Science", "Analytics", "Python"],
        score: null,
        rank: null
      }
    ],
    "web-dev-sprint": [
      {
        id: "3",
        title: "Real-time Collaboration Platform",
        description: "A modern web application for real-time team collaboration and project management.",
        status: "submitted",
        submittedAt: "2024-04-22T18:45:00Z",
        hackathonTitle: "Global Web Dev Sprint",
        teamName: "React Rangers",
        tags: ["React", "WebRTC", "Real-time"],
        score: 96.2,
        rank: 1
      }
    ]
  };

  const hackathons = [
    { id: "ai-challenge", name: "AI Innovation Challenge 2024" },
    { id: "web-dev-sprint", name: "Global Web Dev Sprint" },
    { id: "sustainability-hack", name: "Sustainability Hack 2024" }
  ];

  const currentSubmissions = submissions[selectedHackathon as keyof typeof submissions] || [];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="default">Submitted</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "under_review":
        return <Badge variant="outline">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmitNew = () => {
    setShowSubmissionForm(true);
  };

  const handleSubmissionSubmit = (submissionData: any) => {
    console.log("Submitting:", submissionData);
    setShowSubmissionForm(false);
  };

  const handleViewSubmission = (id: string) => {
    console.log("Viewing submission:", id);
  };

  const handleEditSubmission = (id: string) => {
    console.log("Editing submission:", id);
  };

  const handleDeleteSubmission = (id: string) => {
    console.log("Deleting submission:", id);
  };

  if (showSubmissionForm) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-submissions">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setShowSubmissionForm(false)}
              className="mb-4"
            >
              ← Back to Submissions
            </Button>
            <h1 className="text-3xl font-bold">Submit Your Project</h1>
            <p className="text-muted-foreground">
              Share your amazing hackathon project with the world
            </p>
          </div>
          
          <SubmissionForm
            hackathonId={selectedHackathon}
            onSubmit={handleSubmissionSubmit}
            onCancel={() => setShowSubmissionForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="page-submissions">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Submissions</h1>
              <p className="text-muted-foreground">
                Manage your hackathon project submissions
              </p>
            </div>
            <Button onClick={handleSubmitNew}>
              <Upload className="h-4 w-4 mr-2" />
              New Submission
            </Button>
          </div>
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

        {/* Submissions List */}
        <div className="space-y-4">
          {currentSubmissions.map((submission) => (
            <Card key={submission.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      {submission.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {submission.hackathonTitle} • {submission.teamName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(submission.status)}
                    {submission.score && (
                      <Badge variant="outline">
                        Score: {submission.score}
                      </Badge>
                    )}
                    {submission.rank && (
                      <Badge variant="default">
                        Rank: #{submission.rank}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{submission.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {submission.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewSubmission(submission.id)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  
                  {submission.status === "draft" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSubmission(submission.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSubmission(submission.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {currentSubmissions.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              No submissions found for this hackathon.
            </p>
            <Button onClick={handleSubmitNew}>
              <Upload className="h-4 w-4 mr-2" />
              Create Your First Submission
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
