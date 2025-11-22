import React from 'react';
import ReactDOM from 'react-dom/client';
import SwitchupJobBoard from './swup-operating-system';
import { ThemeProvider } from './hooks';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <SwitchupJobBoard />
        </ThemeProvider>
    </React.StrictMode>
);
