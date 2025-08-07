import React, { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import DataInput from './components/DataInput';
import Notification from './components/Notification';
import Confetti from './components/Confetti';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('slot');
  const [customerNumbers, setCustomerNumbers] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinHistory, setSpinHistory] = useState([]);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('fun'); // 'fun' or 'corporate'
  const [showConfetti, setShowConfetti] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
  };

  const handleSpin = () => {
    if (customerNumbers.length === 0) {
      showNotification('Vui lòng nhập danh sách số khách hàng trước!', 'warning');
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
      showNotification(`🎉 Chúc mừng số ${winner} đã trúng thưởng!`, 'success');
      
      // Show confetti animation
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      
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
    <div className={`app theme-${theme}`}>
      <Confetti active={showConfetti} />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="app-container">
        <div className="app-header">
          <h1 className={`app-title ${theme === 'corporate' ? 'professional' : ''}`}>
            {theme === 'corporate' ? 'Trio Lê Gia Mao Trung' : '🎰 Trio Lê Gia Mao Trung 🎰'}
          </h1>
          <button 
            className="theme-toggle"
            onClick={() => setTheme(theme === 'fun' ? 'corporate' : 'fun')}
            aria-label="Toggle theme"
          >
            {theme === 'fun' ? '🏢 Corporate' : '🎉 Fun'}
          </button>
        </div>
        
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