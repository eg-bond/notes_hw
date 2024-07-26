import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Routing from './components/Routing/Routing';

function App() {
  return (
    <MantineProvider>
      <Routing />
    </MantineProvider>
  );
}

export default App;
