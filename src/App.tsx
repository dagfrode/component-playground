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
  value?: Date;
  onChange?: (value?: Date) => void;
  label?: string;
  id?: string;
}

const pad = (num: number): string => String(num).padStart(2, '0');

const formatDateToDdMmYyyy = (date?: Date): string => {
  if (!date) return '';
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}`;
};

const parseDdMmYyyyToDate = (str: string): Date | undefined => {
  const [dd, mm, yyyy] = str.split('.');
  if (!dd || !mm || !yyyy) return undefined;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(date.getTime()) ? undefined : date;
};

const formatDateToInputValue = (date?: Date): string => {
  if (!date) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const parseInputValueToDate = (value: string): Date | undefined => {
  const [yyyy, mm, dd] = value.split('-');
  if (!dd || !mm || !yyyy) return undefined;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(date.getTime()) ? undefined : date;
};

const isTouchDevice = (): boolean => {
  return typeof window !== 'undefined' && 'ontouchstart' in window;
};

const CustomDateInput: React.FC<Props> = ({
  value,
  onChange,
  label,
  id = 'custom-date-input',
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseDdMmYyyyToDate(e.target.value);
    onChange?.(parsed);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInputValueToDate(e.target.value);
    onChange?.(parsed);
  };

  const handleFocus = () => {
    if (isTouchDevice() && hiddenInputRef.current) {
      hiddenInputRef.current.showPicker?.();
      hiddenInputRef.current.click();
    }
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        value={formatDateToDdMmYyyy(value)}
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
          value={formatDateToInputValue(value)}
          onChange={handleDateChange}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
      )}
    </div>
  );
};




export default App
