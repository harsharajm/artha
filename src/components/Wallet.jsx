import solana_logo from '../images/solana_logo.png';
import eth_logo from '../images/eth_logo.png';
import copy_icon from '../images/copy_icon.png';
import eye_icon from '../images/eye_icon.png';
import { useState } from 'react';

function Wallet({ image, publicKey, privateKey }) {
  const [visibility, setVisibility] = useState(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'stretch', 
      backgroundColor : '#181818',
      border: '1px solid #ccc',
      borderRadius: '50px',
      width: '50%',

    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%'
      }}>
        <img
          src={image ? solana_logo : eth_logo}
          style={{
            height: '3em',
            width: '3em',
            borderRadius: '50%',
            marginRight: '1em'
          }}
          alt="logo"
        />
        <div>
          <div style={{
            fontSize: '0.7em'
          }}>
            {publicKey.slice(0,4)+'....'+publicKey.slice(-4)}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '0.8em',



          }}>

          </div>
        </div>
        <button style={{
          fontSize:'0.5em',
          height:'width'
        }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Wallet;
