import SubmissionForm from '../SubmissionForm';

export default function SubmissionFormExample() {
  //todo: remove mock functionality
  const mockRound = {
    id: 1,
    name: "Final Submission",
    dueAt: "2024-03-17T23:59:59Z"
  };

  const handleSubmit = (data: { repoUrl: string; liveUrl: string; notes: string }) => {
    console.log('Submission submitted:', data);
    alert('Submission successful!');
  };

  const handleCancel = () => {
    console.log('Submission cancelled');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">New Submission</h2>
        <SubmissionForm
          round={mockRound}
          teamName="Code Crusaders"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Edit Existing Submission</h2>
        <SubmissionForm
          round={{
            id: 2,
            name: "Prototype Demo",
            dueAt: "2024-03-20T18:00:00Z"
          }}
          teamName="Innovation Hub"
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          existingSubmission={{
            repoUrl: "https://github.com/innovation-hub/smart-city-optimizer",
            liveUrl: "https://smart-city-demo.vercel.app",
            notes: "Our Smart City Traffic Optimizer uses real-time IoT data and machine learning algorithms to optimize traffic flow in urban areas. Built with React, Node.js, and TensorFlow.js. The system can reduce traffic congestion by up to 30% based on our simulations."
          }}
        />
      </div>
    </div>
  );
}