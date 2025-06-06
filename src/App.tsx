import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import "./App.css";
import CustomDateInput from "./Datepicker";
import { Icon } from "./Icon";

function App() {
  const [date, setDate] = useState<string | undefined>("");
  const schema = v.object({
    dato: v.pipe(v.string("Dato er påkrevd"), v.nonEmpty("Dato er påkrevd")),
  });

  // Automatically infers the output type from the schema
  const form = useForm({
    resolver: valibotResolver(schema),
    defaultValues: {
      dato: "",
    },
  });

  form.watch((value) => {
    setDate(value.dato);
  });

  return (
    <>
      <h1>Test app åæø o012</h1>
      <CustomDateInput label="Velg dato" {...form.register("dato")} />
      <Icon name="1k_plus" />
      <Icon name="1k_plus" size="lg" />
      <div>
        <p>Selected date: {date}</p>
      </div>

      <button
        onClick={() => {
          console.log("Form state:", form.getValues());
          form.handleSubmit((data) => {
            console.log("Form data:", data);
          });
        }}
      >
        Submit
      </button>

      <div>{form.formState.errors.dato?.message}</div>
    </>
  );
}

export default App;
