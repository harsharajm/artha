import './App.css';
import Home from './components/Home.jsx'
import Popup from './components/Popup';
import { useState } from 'react';
import Wallets from './components/Wallets.jsx';

function App() {
  const [view, setView] = useState('wallets');

  return (
    <>
      {view === 'home' && (<Home setView = {setView}/>)}
      {view === 'popup' && (<Popup setView = {setView}/>)}
      {view === 'wallets' && (<Wallets setView = {setView}/>)}
    </>
  );
}

export default App;
