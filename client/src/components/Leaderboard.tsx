import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  teamName: string;
  score: number;
  members: Array<{
    id: string;
    displayName: string;
    avatarUrl?: string;
    contributionScore: number;
  }>;
  submissionTitle?: string;
  tags?: string[];
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
}

export default function Leaderboard({ entries, title = "Leaderboard" }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <div className="h-5 w-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-950/20";
      case 2:
        return "border-l-gray-400 bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-950/20";
      case 3:
        return "border-l-amber-600 bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-950/20";
      default:
        return "border-l-muted";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card data-testid="card-leaderboard">
      <CardHeader>
        <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-leaderboard-title">
          <Trophy className="h-5 w-5" />
          {title}
        </h2>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {entries.map((entry, index) => (
          <Card 
            key={index} 
            className={`border-l-4 ${getRankColor(entry.rank)} hover-elevate`}
            data-testid={`card-leaderboard-entry-${entry.rank}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getRankIcon(entry.rank)}
                  <div>
                    <h3 className="font-semibold" data-testid={`text-team-name-${entry.rank}`}>
                      {entry.teamName}
                    </h3>
                    {entry.submissionTitle && (
                      <p className="text-sm text-muted-foreground">
                        {entry.submissionTitle}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary" data-testid={`text-score-${entry.rank}`}>
                    {entry.score.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {entry.tags.slice(0, 3).map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Team Members */}
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-muted-foreground">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {entry.members.slice(0, 4).map((member, memberIndex) => (
                    <div key={member.id} className="flex items-center gap-2 bg-muted/50 rounded-md p-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatarUrl} alt={member.displayName} />
                        <AvatarFallback className="text-xs">{getInitials(member.displayName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-xs font-medium">{member.displayName}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star className="h-2.5 w-2.5" />
                          <span>{member.contributionScore.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {entry.members.length > 4 && (
                    <div className="flex items-center justify-center bg-muted/50 rounded-md p-2 min-w-[3rem]">
                      <span className="text-xs text-muted-foreground">+{entry.members.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}