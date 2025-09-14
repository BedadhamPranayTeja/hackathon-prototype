import TeamCard from '../TeamCard';

export default function TeamCardExample() {
  //todo: remove mock functionality
  const handleJoinRequest = (id: string) => {
    console.log('Request to join team:', id);
  };

  const handleMessage = (id: string) => {
    console.log('Message team:', id);
  };

  const handleViewTeam = (id: string) => {
    console.log('View team details:', id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <TeamCard
        id="1"
        name="Code Crusaders"
        hackathonTitle="AI Innovation Challenge 2024"
        members={[
          {
            id: "1",
            displayName: "Alex Chen",
            role: "Full-Stack Developer",
            isLeader: true
          },
          {
            id: "2",
            displayName: "Sarah Johnson",
            role: "UI/UX Designer"
          },
          {
            id: "3",
            displayName: "Michael Rodriguez",
            role: "Data Scientist"
          }
        ]}
        lookingForRoles={["Mobile Developer", "DevOps Engineer"]}
        maxMembers={5}
        onJoinRequest={handleJoinRequest}
        onMessage={handleMessage}
        onViewTeam={handleViewTeam}
      />
      
      <TeamCard
        id="2"
        name="Innovation Hub"
        hackathonTitle="Global Web Dev Sprint"
        members={[
          {
            id: "4",
            displayName: "Emily Davis",
            role: "Frontend Developer",
            isLeader: true
          },
          {
            id: "5",
            displayName: "David Kim",
            role: "Backend Developer"
          },
          {
            id: "6",
            displayName: "Lisa Wang",
            role: "Product Manager"
          },
          {
            id: "7",
            displayName: "James Wilson",
            role: "Designer"
          }
        ]}
        lookingForRoles={[]}
        maxMembers={4}
        onJoinRequest={handleJoinRequest}
        onMessage={handleMessage}
        onViewTeam={handleViewTeam}
      />
      
      <TeamCard
        id="3"
        name="Green Tech Warriors"
        hackathonTitle="Sustainability Hack 2024"
        members={[
          {
            id: "8",
            displayName: "Maria Garcia",
            role: "Environmental Engineer",
            isLeader: true
          },
          {
            id: "9",
            displayName: "Ryan Thompson",
            role: "Software Engineer"
          }
        ]}
        lookingForRoles={["Data Analyst", "Mobile Developer", "Marketing"]}
        maxMembers={6}
        onJoinRequest={handleJoinRequest}
        onMessage={handleMessage}
        onViewTeam={handleViewTeam}
      />
    </div>
  );
}