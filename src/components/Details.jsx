import './Details.css'
import settings_icon from '../images/settings_icon.svg';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { Connection, PublicKey } from '@solana/web3.js';

function Details({ selectedWallet, testMode }) {
    const [rotate, setRotate] = useState(false);
    const [balance, setBalance] = useState('Select a Wallet');

    useEffect(() => {
        async function fetchBalance() {
            if (selectedWallet) {
                if (selectedWallet.type === 'SOL') {
                    const connection = new Connection(testMode ? 'https://api.devnet.solana.com' : 'https://api.mainnet-beta.solana.com');
                    const balance = await connection.getBalance(new PublicKey(selectedWallet.publicKey));
                    setBalance((balance / 1000000000).toFixed(9) + ' SOL');
                } else if (selectedWallet.type === 'ETH') {
                    const provider = new ethers.JsonRpcProvider(testMode ? 'https://rpc.ankr.com/eth_goerli' : 'https://rpc.ankr.com/eth');
                    const balance = await provider.getBalance(selectedWallet.publicKey);
                    setBalance(ethers.formatEther(balance) + ' ETH');
                }
            } else {
                setBalance('Select a Wallet');
            }
        }
        fetchBalance();
    }, [selectedWallet, testMode]);

    return (
        <div className="details">
            <img src={settings_icon}
                style={{
                    position: 'static',
                    margin: '6px',
                    transition: 'all ease-in 0.25s',
                    transform: rotate ? 'rotate(45deg)' : 'rotate(0deg)'
                }}
                onMouseEnter={() => {
                    setRotate(true);
                    setTimeout(() => { setRotate(false) }, 250)
                }}
                alt=""
            />
            <div>
                {selectedWallet ? (
                    <>
                        <p>Type: {selectedWallet.type}</p>
                        <p>Public Key: {selectedWallet.publicKey.slice(0, 4) + '...' + selectedWallet.publicKey.slice(-4)}</p>
                        <p>Balance: {balance}</p>
                        <p>Network: {testMode ? 'Testnet' : 'Mainnet'}</p>
                    </>
                ) : (
                    <p>Select a wallet to view details</p>
                )}
            </div>
        </div>
    )
}

export default Details;