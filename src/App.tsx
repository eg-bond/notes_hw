import Routing from './components/Routing/Routing';
import { useAuthContext } from './context/AuthContext';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';

function App() {
  const { authInit } = useAuthContext();

  if (!authInit) {
    return null;
  }

  return <Routing />;
}

export default App;
