import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext.tsx';
import { ModalsProvider } from '@mantine/modals';
import { NotesProvider } from './context/NotesContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MantineProvider>
      <AuthProvider>
        <ModalsProvider>
          <NotesProvider>
            <App />
          </NotesProvider>
        </ModalsProvider>
      </AuthProvider>
    </MantineProvider>
  </BrowserRouter>
);
