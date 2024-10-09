import { MantineProvider } from '@mantine/core';
import Routing from './components/Routing/Routing';
import { NotesProvider } from './context/NotesContext';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <NotesProvider>
          <Routing />
        </NotesProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
