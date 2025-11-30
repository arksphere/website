import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

import { HelmetProvider } from 'react-helmet-async';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Use hydration when SSR markup exists, otherwise fall back to a fresh client render.
const hasSSRMarkup = rootElement.hasChildNodes() && rootElement.innerHTML.trim() !== '<!--app-html-->';

if (hasSSRMarkup) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}
