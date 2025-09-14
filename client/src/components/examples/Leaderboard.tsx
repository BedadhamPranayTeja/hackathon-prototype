import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  //todo: remove mock functionality
  const mockEntries = [
    {
      rank: 1,
      teamName: "Code Crusaders",
      score: 94.5,
      submissionTitle: "AI-Powered Healthcare Assistant",
      tags: ["AI", "Healthcare", "Innovation"],
      members: [
        {
          id: "1",
          displayName: "Alex Chen",
          contributionScore: 9.2
        },
        {
          id: "2",
          displayName: "Sarah Johnson",
          contributionScore: 8.8
        },
        {
          id: "3",
          displayName: "Michael Rodriguez",
          contributionScore: 9.5
        }
      ]
    },
    {
      rank: 2,
      teamName: "Innovation Hub",
      score: 91.2,
      submissionTitle: "Smart City Traffic Optimizer",
      tags: ["Smart City", "IoT", "Optimization"],
      members: [
        {
          id: "4",
          displayName: "Emily Davis",
          contributionScore: 9.0
        },
        {
          id: "5",
          displayName: "David Kim",
          contributionScore: 8.9
        },
        {
          id: "6",
          displayName: "Lisa Wang",
          contributionScore: 8.7
        },
        {
          id: "7",
          displayName: "James Wilson",
          contributionScore: 8.6
        }
      ]
    },
    {
      rank: 3,
      teamName: "Green Tech Warriors",
      score: 87.8,
      submissionTitle: "Carbon Footprint Tracker",
      tags: ["Sustainability", "Environment", "Mobile"],
      members: [
        {
          id: "8",
          displayName: "Maria Garcia",
          contributionScore: 9.1
        },
        {
          id: "9",
          displayName: "Ryan Thompson",
          contributionScore: 8.3
        }
      ]
    },
    {
      rank: 4,
      teamName: "Data Wizards",
      score: 84.3,
      submissionTitle: "Predictive Analytics Platform",
      tags: ["Data Science", "Analytics", "ML"],
      members: [
        {
          id: "10",
          displayName: "Kevin Park",
          contributionScore: 8.9
        },
        {
          id: "11",
          displayName: "Anna Rodriguez",
          contributionScore: 8.1
        },
        {
          id: "12",
          displayName: "Tom Chen",
          contributionScore: 8.5
        },
        {
          id: "13",
          displayName: "Julia Smith",
          contributionScore: 8.0
        },
        {
          id: "14",
          displayName: "Mark Johnson",
          contributionScore: 7.8
        }
      ]
    },
    {
      rank: 5,
      teamName: "Future Builders",
      score: 81.7,
      submissionTitle: "EdTech Learning Platform",
      tags: ["Education", "Web App", "UX"],
      members: [
        {
          id: "15",
          displayName: "Sophie Brown",
          contributionScore: 8.4
        },
        {
          id: "16",
          displayName: "Max Wilson",
          contributionScore: 8.0
        }
      ]
    }
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Leaderboard 
        entries={mockEntries}
        title="AI Innovation Challenge 2024 - Final Rankings"
      />
    </div>
  );
}