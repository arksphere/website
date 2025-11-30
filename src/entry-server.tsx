import React from 'react';
import { PassThrough } from 'stream';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../App';


import { HelmetProvider } from 'react-helmet-async';
import './index.css';

export async function render(url: string) {
  const helmetContext: any = {};

  return new Promise<{ html: string; helmet: any }>((resolve, reject) => {
    let html = '';

    const stream = ReactDOMServer.renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        onAllReady() {
          const bodyStream = new PassThrough();

          bodyStream.on('data', (chunk) => {
            html += chunk.toString();
          });

          bodyStream.on('end', () => {
            const { helmet } = helmetContext;
            resolve({ html, helmet });
          });

          bodyStream.on('error', (err) => reject(err));

          stream.pipe(bodyStream);
        },
        onError(err) {
          reject(err);
        },
      }
    );

    // Failsafe in case rendering hangs
    setTimeout(() => stream.abort(), 10000);
  });
}
