import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './components/GlobalState';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<DataProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </DataProvider>

);


reportWebVitals();
