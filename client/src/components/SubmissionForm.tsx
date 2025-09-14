import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ExternalLink, Github } from "lucide-react";

interface Round {
  id: number;
  name: string;
  dueAt: string;
}

interface SubmissionFormProps {
  round: Round;
  teamName: string;
  onSubmit?: (data: {
    repoUrl: string;
    liveUrl: string;
    notes: string;
  }) => void;
  onCancel?: () => void;
  existingSubmission?: {
    repoUrl: string;
    liveUrl: string;
    notes: string;
  };
}

export default function SubmissionForm({
  round,
  teamName,
  onSubmit,
  onCancel,
  existingSubmission,
}: SubmissionFormProps) {
  const [repoUrl, setRepoUrl] = useState(existingSubmission?.repoUrl || "");
  const [liveUrl, setLiveUrl] = useState(existingSubmission?.liveUrl || "");
  const [notes, setNotes] = useState(existingSubmission?.notes || "");
  
  const [errors, setErrors] = useState<{
    repoUrl?: string;
    liveUrl?: string;
    notes?: string;
  }>({});

  const validateUrl = (url: string, type: 'repo' | 'live') => {
    if (!url.trim()) return `${type === 'repo' ? 'Repository' : 'Live'} URL is required`;
    
    try {
      new URL(url);
      if (type === 'repo' && !url.includes('github.com') && !url.includes('gitlab.com') && !url.includes('bitbucket.org')) {
        return 'Please provide a valid repository URL (GitHub, GitLab, or Bitbucket)';
      }
      return undefined;
    } catch {
      return 'Please provide a valid URL';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    
    const repoError = validateUrl(repoUrl, 'repo');
    if (repoError) newErrors.repoUrl = repoError;
    
    const liveError = validateUrl(liveUrl, 'live');
    if (liveError) newErrors.liveUrl = liveError;
    
    if (!notes.trim()) {
      newErrors.notes = 'Please provide a description of your submission';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.({
        repoUrl: repoUrl.trim(),
        liveUrl: liveUrl.trim(),
        notes: notes.trim(),
      });
      console.log('Submission data:', { repoUrl, liveUrl, notes }); //todo: remove mock functionality
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeUntilDue = () => {
    const now = new Date();
    const dueDate = new Date(round.dueAt);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 0) return "Overdue";
    if (diffHours < 24) return `${diffHours} hours left`;
    
    const diffDays = Math.ceil(diffHours / 24);
    return `${diffDays} days left`;
  };

  const timeLeft = getTimeUntilDue();
  const isOverdue = timeLeft === "Overdue";

  return (
    <Card data-testid="card-submission-form">
      <CardHeader>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold" data-testid="text-round-name">
            {round.name} Submission
          </h2>
          <p className="text-muted-foreground" data-testid="text-team-name">
            Team: {teamName}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Due: {formatDueDate(round.dueAt)}</span>
            </div>
            
            <Badge 
              variant={isOverdue ? "destructive" : timeLeft.includes("hours") ? "destructive" : "secondary"}
              className="flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              {timeLeft}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Repository URL */}
          <div className="space-y-2">
            <Label htmlFor="repoUrl" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              Repository URL *
            </Label>
            <Input
              id="repoUrl"
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={(e) => {
                setRepoUrl(e.target.value);
                if (errors.repoUrl) {
                  setErrors(prev => ({ ...prev, repoUrl: undefined }));
                }
              }}
              className={errors.repoUrl ? "border-destructive" : ""}
              data-testid="input-repo-url"
            />
            {errors.repoUrl && (
              <p className="text-sm text-destructive" data-testid="error-repo-url">
                {errors.repoUrl}
              </p>
            )}
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="liveUrl" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Live Demo URL *
            </Label>
            <Input
              id="liveUrl"
              type="url"
              placeholder="https://your-project-demo.com"
              value={liveUrl}
              onChange={(e) => {
                setLiveUrl(e.target.value);
                if (errors.liveUrl) {
                  setErrors(prev => ({ ...prev, liveUrl: undefined }));
                }
              }}
              className={errors.liveUrl ? "border-destructive" : ""}
              data-testid="input-live-url"
            />
            {errors.liveUrl && (
              <p className="text-sm text-destructive" data-testid="error-live-url">
                {errors.liveUrl}
              </p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Project Description *
            </Label>
            <Textarea
              id="notes"
              placeholder="Describe your project, key features, technologies used, and any special instructions for judges..."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                if (errors.notes) {
                  setErrors(prev => ({ ...prev, notes: undefined }));
                }
              }}
              className={`min-h-32 ${errors.notes ? "border-destructive" : ""}`}
              data-testid="input-notes"
            />
            {errors.notes && (
              <p className="text-sm text-destructive" data-testid="error-notes">
                {errors.notes}
              </p>
            )}
          </div>

          {/* Guidelines */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Submission Guidelines:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ensure your repository is public and includes a README</li>
              <li>• Your live demo should be accessible and functional</li>
              <li>• Include clear instructions for running your project locally</li>
              <li>• Document any API keys or environment variables needed</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="flex-1"
            data-testid="button-submit"
          >
            {existingSubmission ? 'Update Submission' : 'Submit Project'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}