import { useState } from "react";
import "./App.css";
import CustomDateInput from "./Datepicker";

function App() {
  const [date, setDate] = useState<string | undefined>(undefined);
  return (
    <>
      <CustomDateInput
        label="Bundet til state"
        value={date}
        onChange={setDate}
      />
      {/* <CustomDateInput label="Ikke bundet" />

      <CustomDateInput label="Alltid mobil" touchDevice /> */}
      <div>
        <p>Selected date: {date}</p>
      </div>
    </>
  );
}

export default App;
