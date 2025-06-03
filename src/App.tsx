import React, { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <CustomDateInput/>
    </>
  )
}


interface Props {
  value?: string; // Format: dd.mm.yyyy
  onChange?: (value: string) => void;
  label?: string;
  id?: string;
}

const formatDateToInput = (date: string): string => {
  const [dd, mm, yyyy] = date.split('.');
  if (!dd || !mm || !yyyy) return '';
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateFromInput = (value: string): string => {
  const [yyyy, mm, dd] = value.split('-');
  if (!dd || !mm || !yyyy) return '';
  return `${dd}.${mm}.${yyyy}`;
};

const isTouchDevice = () => {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
};

const CustomDateInput: React.FC<Props> = ({ value, onChange, label, id }) => {
  const inputId = id || 'custom-date-input';
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateFromInput(e.target.value);
    onChange(formatted);
  };

  const handleFocus = () => {
    if (isTouchDevice() && hiddenInputRef.current) {
      hiddenInputRef.current.showPicker?.(); // For supporting browsers
      hiddenInputRef.current.click(); // Fallback
    }
  };

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={handleTextChange}
        onFocus={handleFocus}
        placeholder="dd.mm.yyyy"
        inputMode="numeric"
        pattern="\d{2}.\d{2}.\d{4}"
      />
      {isTouchDevice() && (
        <input
          type="date"
          ref={hiddenInputRef}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
          onChange={handleDateChange}
          value={formatDateToInput(value)}
        />
      )}
    </div>
  );
};



export default App
