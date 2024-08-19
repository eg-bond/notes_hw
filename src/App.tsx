import { MantineProvider } from '@mantine/core';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import Routing from './components/Routing/Routing';
import { NotesProvider } from './context/NotesContext';

function App() {
  return (
    <MantineProvider>
      <NotesProvider>
        <Routing />
      </NotesProvider>
    </MantineProvider>
  );
}

export default App;
