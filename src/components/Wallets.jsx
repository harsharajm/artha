import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { ethers } from "ethers";
import Wallet from "./Wallet";
import Details from "./Details";
import './Wallets.css';

function Wallets({mnemonic}) {

  const [solPublicKeys, setSolPublicKeys] = useState([]);
  const [solPrivateKeys, setSolPrivateKeys] = useState([]);
  const [ethPublicKeys, setEthPublicKeys] = useState([]);
  const [ethPrivateKeys, setEthPrivateKeys] = useState([]);
  const [currentSolIndex, setCurrentSolIndex] = useState(0);
  const [currentEthIndex, setCurrentEthIndex] = useState(0);
  const [testMode, setTestMode] = useState(true);
 
  const [selectedWallet, setSelectedWallet] = useState(null);

  const generateSolanaWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentSolIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentSolIndex(x => x + 1);
    setSolPublicKeys(prev => [...prev, keypair.publicKey]);
    setSolPrivateKeys(prev => [...prev, keypair.secretKey]);
  };

  const generateEthereumWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/0/0/${currentEthIndex}`;
  
    const hdNode = ethers.HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
  
    const privateKey = child.privateKey;
    const publicKey = child.publicKey;

    const wallet = new ethers.Wallet(privateKey);

    setCurrentEthIndex(x => x + 1);
    setEthPublicKeys(prev => [...prev, publicKey]); 
    setEthPrivateKeys(prev => [...prev, privateKey]);  
  };

  const handleWalletClick = (type, publicKey, privateKey) => {
    setSelectedWallet({ type, publicKey, privateKey });
  };

  return (
    <div className="wallets_menu">
      <Details selectedWallet={selectedWallet} testMode={testMode} setTestMode={setTestMode} />

      <div className="switch_wallets">
        <button onClick={generateSolanaWallet}>SOL</button>
        <button onClick={generateEthereumWallet}>ETH</button>
      </div>
      <div className="wallet-container">
        <div className="sol-wallets">
          {solPublicKeys.map((e, i) => (
            <Wallet 
              key={`sol-${i}`}
              image={true} 
              publicKey={e.toBase58()} 
              privateKey={bs58.encode(solPrivateKeys[i])}
              onClick={() => handleWalletClick('SOL', e.toBase58(),bs58.encode(solPrivateKeys[i]))}
            />
          ))}
        </div>
        <div className="eth-wallets">
          {ethPublicKeys.map((e, i) => (
            <Wallet 
              key={`eth-${i}`}
              image={false} 
              publicKey={e} 
              privateKey={ethPrivateKeys[i]}
              onClick={() => handleWalletClick('ETH', e,ethPrivateKeys[i])}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallets;