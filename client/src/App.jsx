import { StrictMode, useState } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tasks } from './Tasks.jsx';
import { ProjectSelector } from './ProjectSelector.jsx';

const queryClient = new QueryClient();

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(2); 

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ProjectSelector selectedProjectId={selectedProjectId} onChange={setSelectedProjectId}/>
        <Tasks selectedProjectId={selectedProjectId} />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
