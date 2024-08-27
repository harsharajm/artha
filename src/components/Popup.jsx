import './Popup.css';
import { generateMnemonic } from 'bip39';
import copy_icon from '../images/copy_icon.svg';
import { useEffect, useState } from 'react';


function Popup({setView}) {
  const [mnemonic,setMnemonic] = useState('');
  const [copied,setCopied] = useState(false);
  useEffect(()=>{
    setMnemonic(generateMnemonic());
  },[])

  return (
    <>
    <div className="popup" >


      <div className="copy" style={{ display: 'flex',justifyContent:'space-between',alignItems:'center',padding:'0 10px'}}>

        <h3>Recovery Phrase</h3>
        {copied?"Copied to clipboard":<img onClick={()=>{
          navigator.clipboard.writeText(mnemonic).then(()=>{
            setCopied(x=>!x);
            setTimeout(()=>setCopied(x=>!x),2000)
          })
        }} style={{height:'1em',width : '1em'}} src={copy_icon} alt="copy  " />}
    
      </div>
      <div className="words">
        {mnemonic.split(' ').map((word) => 
        (<div className="word">{word}</div>)
        )
        }
      </div>
      <button style={{
        marginTop:'5px',
        marginBottom:'70px'
        }} onClick={()=>setView('wallets')}>Continue</button>

    </div>
    </>

    
  );
}

export default Popup;
