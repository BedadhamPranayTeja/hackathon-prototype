import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

interface HackathonCardProps {
  id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
  tags: string[];
  participantCount?: number;
  location?: string;
  imageUrl?: string;
  onApply?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export default function HackathonCard({
  id,
  title,
  description,
  startAt,
  endAt,
  tags,
  participantCount = 0,
  location,
  imageUrl,
  onApply,
  onViewDetails,
}: HackathonCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilStart = () => {
    const now = new Date();
    const start = new Date(startAt);
    const diffTime = start.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntil = getDaysUntilStart();

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-hackathon-${id}`}>
      {imageUrl && (
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-xl font-semibold" data-testid={`text-title-${id}`}>{title}</h3>
          </div>
        </div>
      )}
      
      <CardHeader className={!imageUrl ? "pb-3" : "pt-4"}>
        {!imageUrl && (
          <h3 className="text-xl font-semibold" data-testid={`text-title-${id}`}>{title}</h3>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`text-description-${id}`}>
          {description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(startAt)} - {formatDate(endAt)}</span>
          </div>
          
          {daysUntil > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{daysUntil} days to start</span>
            </div>
          )}
          
          {participantCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{participantCount} participants</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={() => onViewDetails?.(id)}
          data-testid={`button-view-details-${id}`}
        >
          View Details
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={() => onApply?.(id)}
          data-testid={`button-apply-${id}`}
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}