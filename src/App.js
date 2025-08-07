import React, { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import DataInput from './components/DataInput';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('slot');
  const [customerNumbers, setCustomerNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinHistory, setSpinHistory] = useState([]);

  const handleSpin = () => {
    if (customerNumbers.length === 0) {
      alert('Vui lòng nhập danh sách số khách hàng trước!');
      return;
    }

    // Pre-select a random number from the list
    const randomIndex = Math.floor(Math.random() * customerNumbers.length);
    const winner = customerNumbers[randomIndex];
    
    setSelectedNumber(winner);
    setIsSpinning(true);

    // Stop spinning after animation
    setTimeout(() => {
      setIsSpinning(false);
      setSpinHistory([...spinHistory, winner]);
      
      // Remove the winner from the list (optional)
      const newNumbers = customerNumbers.filter((num, idx) => idx !== randomIndex);
      setCustomerNumbers(newNumbers);
    }, 4000);
  };

  const handleDataUpdate = (numbers) => {
    setCustomerNumbers(numbers);
    setSelectedNumber(null);
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">🎰 Lucky Draw Event 🎰</h1>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'slot' ? 'active' : ''}`}
            onClick={() => setActiveTab('slot')}
          >
            Quay Số
          </button>
          <button 
            className={`tab ${activeTab === 'input' ? 'active' : ''}`}
            onClick={() => setActiveTab('input')}
          >
            Nhập Dữ Liệu
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'slot' ? (
            <SlotMachine
              selectedNumber={selectedNumber}
              isSpinning={isSpinning}
              onSpin={handleSpin}
              remainingCount={customerNumbers.length}
              spinHistory={spinHistory}
            />
          ) : (
            <DataInput
              customerNumbers={customerNumbers}
              onDataUpdate={handleDataUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;