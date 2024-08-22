import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaSyncAlt, FaPlus, FaCopy } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);

  const publicKeyGenerator = () => {
    return {
      publicKey: 'dummyPublicKey',
      privateKey: 'dummyPrivateKey'
    };
  };

  const fetchCurrentBalance = () => {
    return Math.floor(Math.random() * 1000) + ' SOL';
  };

  const addEntry = () => {
    const newEntry = {
      keyPair: publicKeyGenerator(),
      balance: fetchCurrentBalance(),
      sendAmount: ''
    };
    setTableData([...tableData, newEntry]);
  };

  const updateBalance = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].balance = fetchCurrentBalance();
    setTableData(updatedTableData);
  };

  const handleSendAmountChange = (index, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[index].sendAmount = value;
    setTableData(updatedTableData);
  };

  const [showPrivateKey, setShowPrivateKey] = useState({});

  const togglePrivateKeyVisibility = (index) => {
    setShowPrivateKey((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleCopyPrivateKey = (index) => {
    const privateKey = tableData[index].keyPair.privateKey;
    const textToCopy = showPrivateKey[index] ? privateKey : privateKey;
    copyToClipboard(textToCopy);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <FaPlus className="add-button" onClick={addEntry} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Public Key</th>
            <th>Balance</th>
            <th>Send Money</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td className="table-cell">
                <div className="key-container">
                  <div className="key-text">
                    <span className="text-ellipsis">{row.keyPair.publicKey}</span>
                    <FaCopy
                      className="copy-icon"
                      onClick={() => copyToClipboard(row.keyPair.publicKey)}
                    />
                  </div>
                  <div className="key-text private-key">
                    <span className="text-ellipsis">
                      {showPrivateKey[index] ? row.keyPair.privateKey : '••••••••'}
                    </span>
                    <FaCopy
                      className="copy-icon"
                      onClick={() => handleCopyPrivateKey(index)}
                    />
                    <span
                      className="private-key-icon"
                      onClick={() => togglePrivateKeyVisibility(index)}
                    >
                      {showPrivateKey[index] ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </td>
              <td className="table-cell">
                <div className="balance">
                  <span>{row.balance}</span>
                  <FaSyncAlt
                    className="refresh-icon"
                    onClick={() => updateBalance(index)}
                  />
                </div>
              </td>
              <td className="table-cell">
                <div className="send-money">
                  <input
                    type="text"
                    value={row.sendAmount}
                    onChange={(e) => handleSendAmountChange(index, e.target.value)}
                  />
                  <button className="send-button">Send</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
