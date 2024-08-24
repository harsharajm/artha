import './App.css';
import Home from './components/Home.jsx'
import Popup from './components/Popup';
import Dashboard from './components/Dashboard.jsx';
import { useState } from 'react';

function App() {
  const [view, setView] = useState('home');

  return (
    <>
      {view === 'home' && (<Home setView = {setView}/>)}
      {view === 'popup' && (<Popup setView = {setView}/>)}
      {view === 'dashboard' && (<Dashboard setView = {setView}/>)}
    </>
  );
}

export default App;
