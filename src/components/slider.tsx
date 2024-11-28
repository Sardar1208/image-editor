import { useCallback, useEffect, useRef, useState } from 'react';
import CustomSlider from './CustomSlider';

interface SliderProps {
    onChange: (arg0: number) => void;
    label: string,
}

function PropertyWithSlider({ onChange, label }: SliderProps) {
    const [value, setValue] = useState(0);
    const lastOnChangeTime = useRef<Date | null>(null);
    const lastChangeValue = useRef<number>(0);
    const debounceTimeout = useRef<number | null>(null);

    const onUpdate = useCallback((newValue: number | number[]) => {
        if (typeof newValue === 'number') {
            setValue(newValue);

            const currentTime = new Date();
            const elapsedTime = lastOnChangeTime.current ? (currentTime.getTime() - lastOnChangeTime.current.getTime()) / 1000 : Infinity;
            const valueDifference = Math.abs(newValue - lastChangeValue.current);

            if (valueDifference >= 3 || elapsedTime >= 1) {
                onChange(newValue);
                lastOnChangeTime.current = currentTime;
                lastChangeValue.current = newValue;
            }

            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = window.setTimeout(() => {
                onChange(newValue);
                lastChangeValue.current = newValue;
            }, 1000);
        }
    }, [onChange]);

    useEffect(() => {
        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, []);

    return (
        <div>
            <div style={styles.label}>
                <span>{label}</span>
                <span>{value}</span>
            </div>
            <CustomSlider
                aria-label={label}
                defaultValue={0}
                color="secondary"
                onChange={onUpdate}
                onChangeCommitted={(newValue) => {
                    // if (typeof newValue === 'number') {
                    //     onChange(newValue);
                    //     lastChangeValue.current = newValue;
                    // }
                }}
                // value={value}
                max={10}
                min={-10}
                label='test'
            />
        </div>
    );
}

const styles = {
    label: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: "10px",
    }
}

export default PropertyWithSlider;