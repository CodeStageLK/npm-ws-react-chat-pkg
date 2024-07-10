import React from 'react';
import ReactDOM from 'react-dom';
import './ChatApp.css';
import ChatApp from './ChatApp';

const rootElement = document.getElementById('root');

ReactDOM.render(<ChatApp roomId="52" token="1676|fYxK6kgdrFLhDALRwEszJJnS3MTHNlovXCgWeKWq" userId="31" wsUrl="wss://chat.ayozat.co.uk/ws" />, rootElement);