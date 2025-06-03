import React, { useState, useRef, useEffect } from 'react'
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

const pad = (n: number): string => String(n).padStart(2, '0');

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

const CustomDateInput: React.FC<Props> = ({
  value,
  onChange,
  label,
  id = 'custom-date-input',
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [textValue, setTextValue] = useState(formatDateToDdMmYyyy(value));
  const lastPropValue = useRef<Date | undefined>(value);

  useEffect(() => {
    if (value?.getTime() !== lastPropValue.current?.getTime()) {
      setTextValue(formatDateToDdMmYyyy(value));
      lastPropValue.current = value;
    }
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextValue(val);
    const parsed = parseDdMmYyyyToDate(val);
    onChange?.(parsed);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInputValueToDate(e.target.value);
    if (parsed) {
      onChange?.(parsed);
      setTextValue(formatDateToDdMmYyyy(parsed));
    }
  };

  const handleButtonClick = () => {
    hiddenInputRef.current?.showPicker?.();
    hiddenInputRef.current?.click();
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
        <input
          id={id}
          type="text"
          value={textValue}
          onChange={handleTextChange}
          placeholder="dd.mm.yyyy"
          inputMode="numeric"
          pattern="\d{2}.\d{2}.\d{4}"
          autoComplete="off"
        />
        <button type="button" onClick={handleButtonClick}>
          📅
        </button>
      </div>
      <input
        type="date"
        ref={hiddenInputRef}
        value={formatDateToInputValue(value)}
        onChange={handleDateChange}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
        }}
      />
    </div>
  );
};


export default App
