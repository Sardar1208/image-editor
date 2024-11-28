import { useState } from 'react';
import "./value_controller.css";

interface ValueControllerProps {
    onChange: (arg0: number) => void;
    minValue: number,
    maxValue: number,
    initialValue: number,
}

function ValueController({ onChange, minValue, maxValue, initialValue }: ValueControllerProps) {
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
            <button className="counter-button" onClick={decrement}>-</button>
            <span>{count}</span>
            <button className="counter-button" onClick={increment}>+</button>
        </div>
    );
}

export default ValueController;