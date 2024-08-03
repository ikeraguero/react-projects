import { useEffect, useState } from "react";
import "./index.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [convertFrom, setConvertFrom] = useState("USD");
  const [convertTo, setConvertTo] = useState("EUR");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchConversion() {
        try {
          setIsLoading(true);
          if (!amount) {
            setConvertedAmount(0);
            setIsLoading(false);
            return;
          }
          if (convertFrom === convertTo) {
            setConvertedAmount(amount);
            setIsLoading(false);
            throw new Error(
              `Can't convert from ${convertFrom} to ${convertTo}`
            );
          }
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${convertFrom}&to=${convertTo}`
          );
          const data = await res.json();
          setConvertedAmount(data.rates[convertTo]);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      fetchConversion();
    },
    [amount, convertFrom, convertTo]
  );

  return (
    <div>
      <InputField value={amount} onChange={setAmount} isLoading={isLoading} />
      <SelectCurrency
        onSelect={setConvertFrom}
        value={convertFrom}
        isLoading={isLoading}
      />
      <SelectCurrency
        onSelect={setConvertTo}
        value={convertTo}
        isLoading={isLoading}
      />
      <p>
        {convertedAmount} {convertTo}
      </p>
    </div>
  );
}

function InputField({ value, onChange, isLoading }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={isLoading}
    />
  );
}

function SelectCurrency({ onSelect, value, isLoading }) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      value={value}
      disabled={isLoading}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
      <option value="INR">INR</option>
    </select>
  );
}
