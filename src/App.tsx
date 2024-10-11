import { MantineProvider } from '@mantine/core';
import Routing from './components/Routing/Routing';
import { NotesProvider } from './context/NotesContext';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from './context/AuthProvider';
import '@mantine/tiptap/styles.css';
import '@mantine/core/styles.css';
import '@mantine/spotlight/styles.css';

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <ModalsProvider>
          <NotesProvider>
            <Routing />
          </NotesProvider>
        </ModalsProvider>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
