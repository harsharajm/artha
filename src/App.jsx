import './App.css';
import Home from './components/Home.jsx'
import Popup from './components/Popup';
import { useState } from 'react';
import Wallets from './components/Wallets.jsx';
import Toggle from './components/Toggle.jsx';

function App() {
  const [view, setView] = useState('home');
  const [mnemonic, setMnemonic] = useState('');
  return (
    <div className='window'>
      {view === 'home' && (<Home setView = {setView}/>)}
      {view === 'popup' && (<Popup setView={setView} setMnemonic={setMnemonic}/>)}
      {view === 'wallets' && (<Wallets mnemonic={mnemonic}/>)}
    </div>
  );
}

export default App;