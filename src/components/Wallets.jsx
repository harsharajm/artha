import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

function Wallets() {
  const mnemonic = 'throw job million bundle focus around network door bargain improve traffic evil'; // For testing. Remove and add as props.

  const [publicKeys, setPublicKeys] = useState([]);
  const [privateKeys, setPrivateKeys] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <div>
        <h3>Wallets</h3>
        <button
          onClick={async () => {
            const seed = await mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString('hex')).key;

            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);

            setCurrentIndex(x => x + 1);
            setPublicKeys(prev => [...prev, keypair.publicKey]);
            setPrivateKeys(prev => [...prev, keypair.secretKey]);
          }}
        >
          Add Solana Wallet
        </button>
        <button>Add Ethereum Wallet</button>
      </div>
      <div>
        {publicKeys.map((e, i) => {
          return (
            <div key={i} style={{ border: 'solid grey 1px', padding: '10px' }}>
              <div>{e.toBase58()}</div>
              <div>{bs58.encode(privateKeys[i])}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Wallets;
