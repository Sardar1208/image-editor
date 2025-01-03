import { useState } from "react";
import "./value_controller.css";
import { colors } from "../constants/theme";

interface ValueControllerProps {
  onChange: (arg0: number) => void;
  minValue: number;
  maxValue: number;
  initialValue: number;
}

function ValueController({
  onChange,
  minValue,
  maxValue,
  initialValue,
}: ValueControllerProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    let newValue = Math.min(count + 10, maxValue);
    if (newValue == count) {
      return;
    }
    setCount(newValue);
    onChange(newValue);
  };

  const decrement = () => {
    let newValue = Math.max(minValue, count - 10);
    if (newValue == count) {
      return;
    }
    setCount(newValue);
    onChange(newValue);
  };

  return (
    <div className="counter-container">
      <button className="counter-button" onClick={decrement} style={{backgroundColor: colors.primary}}>
        -
      </button>
      <div className="counter-text" style={{backgroundColor: colors.secondary}}>
        <span style={{color: colors.textPrimary}}>{count}</span>
      </div>
      <button className="counter-button" onClick={increment} style={{backgroundColor: colors.primary}}>
        +
      </button>
    </div>
  );
}

export default ValueController;
