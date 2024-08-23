import './App.css';
import Popup from './components/Popup';
import Dashboard from './components/Dashboard.jsx';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('home');

  const generate = () => {
    setView('mnemonic');
  };

  return (
    <>
      {view === 'home' && (
        <>
          <button onClick={generate}>Generate Mnemonic</button>
        </>
      )}

      {view === 'mnemonic' && (
        <>
          <Popup setView = {setView}/>
        </>
      )}
      {view === 'dashboard' && (
        <>
          <Dashboard setView = {setView}/>
        </>
      )}
    </>
  );
}

export default App;
