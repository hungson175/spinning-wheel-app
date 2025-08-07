import React, { useState, useRef } from 'react';
import { Upload, FileText, Save, Trash2 } from 'lucide-react';
import './DataInput.css';

const DataInput = ({ customerNumbers, onDataUpdate }) => {
  const [textInput, setTextInput] = useState(customerNumbers.join('\n'));
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        processTextData(content);
        setUploadStatus(`Đã tải file: ${file.name}`);
      };
      reader.readAsText(file);
    } else {
      setUploadStatus('Vui lòng chọn file .txt');
    }
  };

  const processTextData = (text) => {
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line && /^\d{1,4}$/.test(line))
      .map(line => line.padStart(4, '0'));
    
    const uniqueNumbers = [...new Set(lines)];
    setTextInput(uniqueNumbers.join('\n'));
    return uniqueNumbers;
  };

  const handleSaveData = () => {
    const numbers = processTextData(textInput);
    onDataUpdate(numbers);
    setUploadStatus(`Đã lưu ${numbers.length} số`);
  };

  const handleClearData = () => {
    setTextInput('');
    onDataUpdate([]);
    setUploadStatus('Đã xóa dữ liệu');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    setUploadStatus('');
  };

  const currentCount = textInput.split('\n').filter(line => line.trim()).length;

  return (
    <div className="data-input-container">
      <div className="input-section">
        <div className="input-header">
          <h2>Nhập Danh Sách Số Khách Hàng</h2>
          <p className="input-description">
            Nhập số khách hàng (1-4 chữ số), mỗi số một dòng
          </p>
        </div>

        <div className="upload-section">
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-button">
            <Upload size={20} />
            Tải File TXT
          </label>
          
          {uploadStatus && (
            <div className="upload-status">
              <FileText size={16} />
              {uploadStatus}
            </div>
          )}
        </div>

        <div className="text-input-section">
          <textarea
            className="text-input"
            value={textInput}
            onChange={handleTextChange}
            placeholder="Nhập danh sách số&#10;Ví dụ:&#10;1234&#10;5678&#10;9012&#10;..."
            rows="15"
          />
          <div className="input-info">
            Số lượng: <strong>{currentCount}</strong> số
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="save-button"
            onClick={handleSaveData}
            disabled={!textInput.trim()}
          >
            <Save size={20} />
            Lưu Dữ Liệu
          </button>
          <button 
            className="clear-button"
            onClick={handleClearData}
            disabled={!textInput.trim()}
          >
            <Trash2 size={20} />
            Xóa Tất Cả
          </button>
        </div>
      </div>

      {customerNumbers.length > 0 && (
        <div className="preview-section">
          <h3>Danh Sách Hiện Tại ({customerNumbers.length} số)</h3>
          <div className="preview-list">
            {customerNumbers.slice(0, 10).map((num, index) => (
              <div key={index} className="preview-item">
                {num}
              </div>
            ))}
            {customerNumbers.length > 10 && (
              <div className="preview-more">
                ... và {customerNumbers.length - 10} số khác
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInput;