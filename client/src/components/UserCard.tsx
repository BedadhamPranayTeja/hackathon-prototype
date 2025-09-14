import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, UserPlus, MapPin, Star } from "lucide-react";

interface UserCardProps {
  id: string;
  displayName: string;
  bio?: string;
  location?: string;
  skills: Array<{
    name: string;
    level: number; // 1-5
  }>;
  avatarUrl?: string;
  rating?: number;
  isOnline?: boolean;
  onMessage?: (id: string) => void;
  onInvite?: (id: string) => void;
}

export default function UserCard({
  id,
  displayName,
  bio,
  location,
  skills,
  avatarUrl,
  rating,
  isOnline,
  onMessage,
  onInvite,
}: UserCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 4) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (level >= 3) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <Card className="hover-elevate" data-testid={`card-user-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={avatarUrl} alt={displayName} />
              <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate" data-testid={`text-name-${id}`}>
              {displayName}
            </h3>
            {location && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </div>
            )}
            {rating && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {bio && (
          <p className="text-xs text-muted-foreground line-clamp-2" data-testid={`text-bio-${id}`}>
            {bio}
          </p>
        )}
        
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 4).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className={`text-xs px-2 py-0.5 ${getSkillLevelColor(skill.level)}`}
              >
                {skill.name} ({skill.level}/5)
              </Badge>
            ))}
            {skills.length > 4 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{skills.length - 4}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 text-xs h-8"
            onClick={() => onMessage?.(id)}
            data-testid={`button-message-${id}`}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Message
          </Button>
          <Button 
            size="sm" 
            className="flex-1 text-xs h-8"
            onClick={() => onInvite?.(id)}
            data-testid={`button-invite-${id}`}
          >
            <UserPlus className="h-3 w-3 mr-1" />
            Invite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}