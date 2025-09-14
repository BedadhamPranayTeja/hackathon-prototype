import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HackathonCard from "@/components/HackathonCard";
import { ArrowRight, Zap, Users, Trophy, Code } from "lucide-react";
import { Link } from "wouter";
import hackathonHeroImage from '@assets/generated_images/Hackathon_hero_banner_image_3d5bd0d0.png';
import aiHackathonImage from '@assets/generated_images/AI_hackathon_theme_image_a7c43aee.png';
import webHackathonImage from '@assets/generated_images/Web_dev_hackathon_image_3951e5a1.png';
import teamWorkspaceImage from '@assets/generated_images/Team_collaboration_workspace_image_ee6ff5c1.png';

export default function Home() {
  //todo: remove mock functionality
  const handleApply = (id: string) => {
    console.log('Apply to hackathon:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View hackathon details:', id);
  };

  const featuredHackathons = [
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
      location: "Virtual Event",
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
    }
  ];

  return (
    <div className="min-h-screen" data-testid="page-home">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${teamWorkspaceImage})` }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              Join 10,000+ developers worldwide
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
              Build. Compete. Win.
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join hackathons, form amazing teams, and create innovative solutions that make a difference. 
              Connect with like-minded developers and turn your ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/discover">
                <Button size="lg" className="px-8 py-6 text-lg" data-testid="button-discover-hackathons">
                  Discover Hackathons
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/login">
                <Button variant="outline" size="lg" className="px-8 py-6 text-lg backdrop-blur-sm" data-testid="button-join-now">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold">10,000+</h3>
              <p className="text-muted-foreground">Active Developers</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-muted-foreground">Hackathons Hosted</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-3xl font-bold">$2M+</h3>
              <p className="text-muted-foreground">Prize Money Awarded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathons */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-hackathons-title">
              Featured Hackathons
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join these exciting competitions and showcase your skills alongside talented developers from around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredHackathons.map((hackathon) => (
              <HackathonCard
                key={hackathon.id}
                {...hackathon}
                onApply={handleApply}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/discover">
              <Button variant="outline" size="lg" data-testid="button-view-all-hackathons">
                View All Hackathons
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get started in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Browse & Apply</h3>
              <p className="text-muted-foreground">
                Discover hackathons that match your interests and skills. Apply individually or with your team.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">Form Teams</h3>
              <p className="text-muted-foreground">
                Connect with other participants, form teams, and collaborate on innovative solutions.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Build & Win</h3>
              <p className="text-muted-foreground">
                Submit your project, get judged by industry experts, and compete for amazing prizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of developers who are building the future through hackathons.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="px-8 py-6 text-lg" data-testid="button-get-started">
                Get Started for Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link href="/discover">
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg" data-testid="button-explore-hackathons">
                Explore Hackathons
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}