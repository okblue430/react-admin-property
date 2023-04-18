import Dashboard from 'pages/Dashboard';
import './App.css';
import DataContextContainer from 'contexts/DataContextContainer';

const App = () => {
  return (
    <DataContextContainer>
      <Dashboard />
    </DataContextContainer>
  );
};
export default App;