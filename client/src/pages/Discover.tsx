import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import HackathonCard from "@/components/HackathonCard";
import { Search, Filter, MapPin, Calendar } from "lucide-react";
import hackathonHeroImage from '@assets/generated_images/Hackathon_hero_banner_image_3d5bd0d0.png';
import aiHackathonImage from '@assets/generated_images/AI_hackathon_theme_image_a7c43aee.png';
import webHackathonImage from '@assets/generated_images/Web_dev_hackathon_image_3951e5a1.png';

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("date");
  const [showFilters, setShowFilters] = useState(false);

  //todo: remove mock functionality
  const allTags = ["AI", "Machine Learning", "Web Dev", "Mobile", "Blockchain", "IoT", "Sustainability", "Healthcare", "Fintech", "Gaming"];
  const locations = ["Virtual", "San Francisco, CA", "New York, NY", "Austin, TX", "London, UK", "Berlin, Germany"];

  const mockHackathons = [
    {
      id: "1",
      title: "AI Innovation Challenge 2024",
      description: "Build the next generation of AI applications that solve real-world problems. Focus on machine learning, natural language processing, and computer vision.",
      startAt: "2024-03-15T09:00:00Z",
      endAt: "2024-03-17T18:00:00Z",
      tags: ["AI", "Machine Learning", "Innovation"],
      participantCount: 245,
      location: "San Francisco, CA",
      imageUrl: aiHackathonImage
    },
    {
      id: "2",
      title: "Global Web Dev Sprint",
      description: "Create innovative web applications using modern frameworks. Showcase your skills in React, Node.js, and cloud technologies.",
      startAt: "2024-04-20T10:00:00Z",
      endAt: "2024-04-22T20:00:00Z",
      tags: ["Web Dev", "React", "Node.js"],
      participantCount: 189,
      location: "Virtual",
      imageUrl: webHackathonImage
    },
    {
      id: "3",
      title: "Sustainability Hack 2024",
      description: "Develop technology solutions for environmental challenges. Work on projects that make a positive impact on our planet.",
      startAt: "2024-05-10T08:00:00Z",
      endAt: "2024-05-12T17:00:00Z",
      tags: ["Sustainability", "Environment"],
      participantCount: 156,
      location: "Austin, TX",
      imageUrl: hackathonHeroImage
    },
    {
      id: "4",
      title: "Mobile App Innovation",
      description: "Create the next breakthrough mobile application. Focus on user experience, performance, and innovative features.",
      startAt: "2024-06-01T09:00:00Z",
      endAt: "2024-06-03T18:00:00Z",
      tags: ["Mobile", "iOS", "Android"],
      participantCount: 124,
      location: "New York, NY",
      imageUrl: hackathonHeroImage
    },
    {
      id: "5",
      title: "Blockchain & Crypto Challenge",
      description: "Build decentralized applications and explore the future of blockchain technology. Focus on DeFi, NFTs, and Web3.",
      startAt: "2024-07-15T10:00:00Z",
      endAt: "2024-07-17T20:00:00Z",
      tags: ["Blockchain", "Web3", "Crypto"],
      participantCount: 98,
      location: "Virtual",
      imageUrl: aiHackathonImage
    },
    {
      id: "6",
      title: "Healthcare Tech Solutions",
      description: "Develop technology solutions that improve healthcare delivery and patient outcomes. Partner with medical professionals.",
      startAt: "2024-08-10T08:00:00Z",
      endAt: "2024-08-12T17:00:00Z",
      tags: ["Healthcare", "MedTech", "AI"],
      participantCount: 167,
      location: "London, UK",
      imageUrl: webHackathonImage
    }
  ];

  const filteredHackathons = mockHackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !selectedLocation || hackathon.location === selectedLocation;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => hackathon.tags.includes(tag));
    
    return matchesSearch && matchesLocation && matchesTags;
  });

  const handleApply = (id: string) => {
    console.log('Apply to hackathon:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View hackathon details:', id);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLocation("");
    setSelectedTags([]);
    setSortBy("date");
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-discover">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="text-discover-title">Discover Hackathons</h1>
          <p className="text-muted-foreground">Find the perfect hackathon to showcase your skills and meet amazing people</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  data-testid="button-toggle-filters"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-48" data-testid="select-location">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48" data-testid="select-sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Start Date</SelectItem>
                      <SelectItem value="participants">Participants</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(selectedTags.length > 0 || selectedLocation || searchQuery) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <div className="border-t pt-4 space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Technologies & Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => handleTagToggle(tag)}
                            data-testid={`checkbox-tag-${tag.toLowerCase()}`}
                          />
                          <label htmlFor={tag} className="text-sm cursor-pointer">
                            {tag}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Active Filters */}
              {(selectedTags.length > 0 || selectedLocation) && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                           onClick={() => handleTagToggle(tag)}>
                      {tag} ×
                    </Badge>
                  ))}
                  {selectedLocation && (
                    <Badge variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                           onClick={() => setSelectedLocation("")}>
                      📍 {selectedLocation} ×
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground" data-testid="text-results-count">
            {filteredHackathons.length} hackathon{filteredHackathons.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Hackathon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="hackathon-grid">
          {filteredHackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              {...hackathon}
              onApply={handleApply}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4" data-testid="text-no-results">
              No hackathons match your current filters.
            </p>
            <Button variant="outline" onClick={clearFilters} data-testid="button-clear-all-filters">
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}