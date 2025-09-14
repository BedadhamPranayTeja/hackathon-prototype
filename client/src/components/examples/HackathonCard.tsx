import HackathonCard from '../HackathonCard';
import hackathonHeroImage from '@assets/generated_images/Hackathon_hero_banner_image_3d5bd0d0.png';
import aiHackathonImage from '@assets/generated_images/AI_hackathon_theme_image_a7c43aee.png';
import webHackathonImage from '@assets/generated_images/Web_dev_hackathon_image_3951e5a1.png';

export default function HackathonCardExample() {
  //todo: remove mock functionality
  const handleApply = (id: string) => {
    console.log('Apply to hackathon:', id);
  };

  const handleViewDetails = (id: string) => {
    console.log('View hackathon details:', id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <HackathonCard
        id="1"
        title="AI Innovation Challenge 2024"
        description="Build the next generation of AI applications that solve real-world problems. Focus on machine learning, natural language processing, and computer vision."
        startAt="2024-03-15T09:00:00Z"
        endAt="2024-03-17T18:00:00Z"
        tags={["AI", "Machine Learning", "Innovation", "Tech"]}
        participantCount={245}
        location="San Francisco, CA"
        imageUrl={aiHackathonImage}
        onApply={handleApply}
        onViewDetails={handleViewDetails}
      />
      
      <HackathonCard
        id="2"
        title="Global Web Dev Sprint"
        description="Create innovative web applications using modern frameworks. Showcase your skills in React, Node.js, and cloud technologies."
        startAt="2024-04-20T10:00:00Z"
        endAt="2024-04-22T20:00:00Z"
        tags={["Web Dev", "React", "Node.js", "Cloud"]}
        participantCount={189}
        location="Virtual Event"
        imageUrl={webHackathonImage}
        onApply={handleApply}
        onViewDetails={handleViewDetails}
      />
      
      <HackathonCard
        id="3"
        title="Sustainability Hack 2024"
        description="Develop technology solutions for environmental challenges. Work on projects that make a positive impact on our planet."
        startAt="2024-05-10T08:00:00Z"
        endAt="2024-05-12T17:00:00Z"
        tags={["Sustainability", "Environment", "Impact"]}
        participantCount={156}
        location="Austin, TX"
        imageUrl={hackathonHeroImage}
        onApply={handleApply}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}