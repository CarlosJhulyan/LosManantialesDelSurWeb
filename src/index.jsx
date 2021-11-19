import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';
import Context from './Context';

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
