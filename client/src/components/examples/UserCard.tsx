import UserCard from '../UserCard';

export default function UserCardExample() {
  //todo: remove mock functionality
  const handleMessage = (id: string) => {
    console.log('Message user:', id);
  };

  const handleInvite = (id: string) => {
    console.log('Invite user:', id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      <UserCard
        id="1"
        displayName="Alex Chen"
        bio="Full-stack developer with 5 years experience. Love building scalable web applications and exploring new technologies."
        location="San Francisco, CA"
        skills={[
          { name: "React", level: 5 },
          { name: "Node.js", level: 4 },
          { name: "Python", level: 4 },
          { name: "AWS", level: 3 }
        ]}
        rating={4.8}
        isOnline={true}
        onMessage={handleMessage}
        onInvite={handleInvite}
      />
      
      <UserCard
        id="2"
        displayName="Sarah Johnson"
        bio="UI/UX designer passionate about creating intuitive user experiences. Proficient in design systems and user research."
        location="New York, NY"
        skills={[
          { name: "Figma", level: 5 },
          { name: "UI Design", level: 5 },
          { name: "UX Research", level: 4 },
          { name: "Prototyping", level: 4 }
        ]}
        rating={4.9}
        isOnline={false}
        onMessage={handleMessage}
        onInvite={handleInvite}
      />
      
      <UserCard
        id="3"
        displayName="Michael Rodriguez"
        bio="Data scientist and ML engineer. Experienced in building predictive models and working with large datasets."
        location="Austin, TX"
        skills={[
          { name: "Python", level: 5 },
          { name: "TensorFlow", level: 4 },
          { name: "SQL", level: 4 },
          { name: "R", level: 3 },
          { name: "Docker", level: 3 }
        ]}
        rating={4.7}
        isOnline={true}
        onMessage={handleMessage}
        onInvite={handleInvite}
      />
      
      <UserCard
        id="4"
        displayName="Emily Davis"
        bio="Mobile developer specializing in React Native and Flutter. Love creating cross-platform applications."
        location="Seattle, WA"
        skills={[
          { name: "React Native", level: 5 },
          { name: "Flutter", level: 4 },
          { name: "iOS", level: 3 }
        ]}
        rating={4.6}
        isOnline={true}
        onMessage={handleMessage}
        onInvite={handleInvite}
      />
    </div>
  );
}