import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {PortfolioContentProvider} from './content';
import {initializeAnalytics} from './lib/analytics.ts';

initializeAnalytics();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioContentProvider>
      <App />
    </PortfolioContentProvider>
  </StrictMode>,
);
