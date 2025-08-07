import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
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

  const handleReset = () => {
    // Reload the page to reset everything
    window.location.reload();
  };

  return (
    <div className="app theme-corporate">
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
          <button 
            className="reset-button"
            onClick={handleReset}
            aria-label="Reset application"
            title="Reset toàn bộ ứng dụng"
          >
            <RotateCcw size={20} />
            Reset
          </button>
          <h1 className="app-title professional">
            Trio Lê Gia Mao Trung
          </h1>
        </div>
        
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'slot' ? 'active' : ''}`}
            onClick={() => setActiveTab('slot')}
          >
            Game
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