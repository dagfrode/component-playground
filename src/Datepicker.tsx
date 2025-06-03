import React, { useRef, useState } from "react";
interface Props {
  value?: string;
  onChange?: (value?: string) => void;
  label?: string;
  id?: string;
  touchDevice?: boolean;
}

const isTouchDevice = (): boolean => {
  return typeof window !== "undefined" && "ontouchstart" in window;
};

const pad = (n: number): string => String(n).padStart(2, "0");

const formatDateToDdMmYyyy = (date?: Date): string => {
  if (!date) return "";
  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()}`;
};

const parseDdMmYyyyToDate = (str?: string): Date | undefined => {
  if (!str) return undefined;
  const [dd, mm, yyyy] = str.split(".");
  if (!dd || !mm || !yyyy) return undefined;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(date.getTime()) ? undefined : date;
};

const formatDateToInputValue = (date?: string): string => {
  const parsedDate = parseDdMmYyyyToDate(date);
  if (!parsedDate) return "";
  return `${parsedDate.getFullYear()}-${pad(parsedDate.getMonth() + 1)}-${pad(
    parsedDate.getDate()
  )}`;
};

const parseInputValueToDate = (value: string): Date | undefined => {
  const [yyyy, mm, dd] = value.split("-");
  if (!dd || !mm || !yyyy) return undefined;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return isNaN(date.getTime()) ? undefined : date;
};

const CustomDateInput: React.FC<Props> = ({
  value,
  onChange,
  label,
  touchDevice = isTouchDevice(),
  id = "custom-date-input",
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [textValue, setTextValue] = useState(value);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextValue(val);
    onChange?.(val);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInputValueToDate(e.target.value);
    if (parsed) {
      onChange?.(formatDateToDdMmYyyy(parsed));
      setTextValue(formatDateToDdMmYyyy(parsed));
    } else {
      onChange?.(undefined);
      setTextValue("");
    }
  };

  const handleButtonClick = () => {
    hiddenInputRef.current?.showPicker?.();
  };

  const handleDateInputClicked = () => {
    if (touchDevice) {
      handleButtonClick();
    }
  };

  // TODO add hide format
  // TODO hide formatting for touch devices?
  // TODO localize date format
  // TODO fix default  id

  return (
    <div
      style={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      <label htmlFor={id}>{label} (dd.mm.åååå)</label>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
        <input
          id={id}
          type="text"
          value={textValue}
          onChange={handleTextChange}
          onClick={handleDateInputClicked}
          placeholder="dd.mm.yyyy"
          inputMode={touchDevice ? "none" : "numeric"}
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
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          height: 0,
          width: 0,
        }}
      />
    </div>
  );
};
export default CustomDateInput;
