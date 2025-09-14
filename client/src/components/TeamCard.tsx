import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Users, MessageSquare, UserPlus, Crown } from "lucide-react";

interface TeamMember {
  id: string;
  displayName: string;
  role: string;
  avatarUrl?: string;
  isLeader?: boolean;
}

interface TeamCardProps {
  id: string;
  name: string;
  hackathonTitle: string;
  members: TeamMember[];
  lookingForRoles?: string[];
  maxMembers?: number;
  onJoinRequest?: (id: string) => void;
  onMessage?: (id: string) => void;
  onViewTeam?: (id: string) => void;
}

export default function TeamCard({
  id,
  name,
  hackathonTitle,
  members,
  lookingForRoles = [],
  maxMembers = 6,
  onJoinRequest,
  onMessage,
  onViewTeam,
}: TeamCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isTeamFull = members.length >= maxMembers;
  const spotsLeft = maxMembers - members.length;
  
  return (
    <Card className="hover-elevate" data-testid={`card-team-${id}`}>
      <CardHeader className="pb-3">
        <div className="space-y-2">
          <h3 className="font-semibold" data-testid={`text-team-name-${id}`}>{name}</h3>
          <p className="text-sm text-muted-foreground" data-testid={`text-hackathon-title-${id}`}>
            {hackathonTitle}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{members.length}/{maxMembers} members</span>
            </div>
            
            {spotsLeft > 0 && (
              <Badge variant="secondary" className="text-xs">
                {spotsLeft} spots left
              </Badge>
            )}
            
            {isTeamFull && (
              <Badge variant="outline" className="text-xs">
                Team Full
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Team Members */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">Team Members</h4>
          <div className="space-y-2">
            {members.slice(0, 3).map((member, index) => (
              <div key={member.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatarUrl} alt={member.displayName} />
                  <AvatarFallback className="text-xs">{getInitials(member.displayName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-sm truncate">{member.displayName}</span>
                    {member.isLeader && (
                      <Crown className="h-3 w-3 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
            
            {members.length > 3 && (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">+{members.length - 3}</span>
                </div>
                <span className="text-sm text-muted-foreground">more members</span>
              </div>
            )}
          </div>
        </div>

        {/* Looking for roles */}
        {lookingForRoles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Looking for:</h4>
            <div className="flex flex-wrap gap-1">
              {lookingForRoles.map((role, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onMessage?.(id)}
          data-testid={`button-message-team-${id}`}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Message
        </Button>
        
        {!isTeamFull ? (
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onJoinRequest?.(id)}
            data-testid={`button-join-team-${id}`}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Join Team
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewTeam?.(id)}
            data-testid={`button-view-team-${id}`}
          >
            View Team
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}