import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import Context from './context';

import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <Context.Provider>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
