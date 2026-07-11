import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {PortfolioContentProvider} from './content.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioContentProvider>
      <App />
    </PortfolioContentProvider>
  </StrictMode>,
);
