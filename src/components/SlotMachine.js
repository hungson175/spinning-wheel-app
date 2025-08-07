import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import './SlotMachine.css';

const SlotMachine = ({ selectedNumber, isSpinning, onSpin, remainingCount, spinHistory }) => {
  const [displayDigits, setDisplayDigits] = useState(['0', '0', '0', '0']);
  const [spinning, setSpinning] = useState([false, false, false, false]);

  useEffect(() => {
    if (isSpinning && selectedNumber) {
      const targetDigits = selectedNumber.padStart(4, '0').split('');
      
      // Start spinning all reels
      setSpinning([true, true, true, true]);
      
      // Stop each reel one by one with delay
      targetDigits.forEach((digit, index) => {
        setTimeout(() => {
          setDisplayDigits(prev => {
            const newDigits = [...prev];
            newDigits[index] = digit;
            return newDigits;
          });
          setSpinning(prev => {
            const newSpinning = [...prev];
            newSpinning[index] = false;
            return newSpinning;
          });
        }, 1000 + (index * 500)); // Stop each reel 500ms apart
      });
    }
  }, [isSpinning, selectedNumber]);

  return (
    <div className="slot-machine-container">
      <div className="slot-machine">
        <div className="slot-frame">
          <div className="slot-reels">
            {displayDigits.map((digit, index) => (
              <div key={index} className="reel-container" role="img" aria-label={`Slot reel ${index + 1} showing ${digit}`}>
                <div className={`reel ${spinning[index] ? 'spinning' : ''}`}>
                  <div className="digit-display">{digit}</div>
                  {spinning[index] && (
                    <div className="spinning-numbers" aria-hidden="true">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className="spinning-digit">{i}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className={`spin-button ${isSpinning ? 'spinning' : ''}`}
          onClick={onSpin}
          disabled={isSpinning || remainingCount === 0}
          aria-label="Start lucky draw spin"
          aria-describedby="remaining-count"
          aria-busy={isSpinning}
        >
          {isSpinning ? '🎰 ĐANG QUAY...' : '🎯 QUAY SỐ'}
        </button>
      </div>

      <div className="info-panel">
        <div className="remaining-count" id="remaining-count">
          <h3>Số lượng còn lại</h3>
          <div className="count" aria-live="polite" aria-atomic="true">
            {remainingCount}
          </div>
        </div>

        {spinHistory.length > 0 && (
          <div className="history">
            <h3>Lịch sử quay</h3>
            <div className="history-list">
              {spinHistory.slice(-5).reverse().map((num, index) => (
                <div key={index} className={`history-item ${index === 0 ? 'latest' : ''}`}>
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotMachine;