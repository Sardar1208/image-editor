import { useCallback, useEffect, useRef, useState } from "react";
import { getAdjustmentValue } from "../utils/tune_image_sm";
import { AdjustmentType } from "../types/T_ProcessTypes";
import { useSelector } from "react-redux";
import { IRootState } from "../store";

interface SliderProps {
  min?: number;
  max?: number;
  onChange: (arg0: number) => void;
  label: string;
  adjustmentType: AdjustmentType;
}

function PropertyWithSlider({
  min = -10,
  max = 10,
  onChange,
  label,
  adjustmentType,
}: SliderProps) {
  const state = useSelector(
    (state: IRootState) => state.tuneImageReducer.adjustments
  );

  const [value, setValue] = useState(0);
  const lastOnChangeTime = useRef<Date | null>(null);
  const lastChangeValue = useRef<number>(0);
  const debounceTimeout = useRef<number | null>(null);

  useEffect(() => {
    const adjustmentValue = getAdjustmentValue(adjustmentType);
    console.log("refetching adjustment values for slider", adjustmentValue);
    setValue(adjustmentValue);
  }, [state]);

  const onUpdate = useCallback(
    (newValue: number | number[]) => {
      if (typeof newValue === "number") {
        setValue(newValue);

        const currentTime = new Date();
        const elapsedTime = lastOnChangeTime.current
          ? (currentTime.getTime() - lastOnChangeTime.current.getTime()) / 1000
          : Infinity;
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
    },
    [onChange]
  );

  function onChangeCommitted() {}

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = useCallback(() => {
    if (isDragging.current) {
      //   onChangeCommitted(value);
    }
    isDragging.current = false;
  }, [onChangeCommitted, value]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;

      const track = event.currentTarget;
      const rect = track.getBoundingClientRect();
      const percentage = Math.min(
        Math.max((event.clientX - rect.left) / rect.width, 0),
        1
      );
      const newValue = Math.round(min + percentage * (max - min));
      if (newValue !== value) {
        setValue(newValue);
        onUpdate(newValue);
      }
    },
    [value, min, max, onUpdate]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const track = event.currentTarget;
      const rect = track.getBoundingClientRect();
      const percentage = Math.min(
        Math.max((event.clientX - rect.left) / rect.width, 0),
        1
      );
      const newValue = Math.round(min + percentage * (max - min));
      setValue(newValue);
      onUpdate(newValue);
      onChangeCommitted(newValue);
    },
    [min, max, onUpdate, onChangeCommitted]
  );

  const percentage = ((value - min) / (max - min)) * 100;

  // Generate divisions based on the min and max range
  const divisions = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div>
      <div style={styles.label}>
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div style={styles.sliderContainer}>
        <div
          style={styles.slider}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
        >
          {/* Track */}
          <div style={styles.track}>
            {/* Filled Track */}
            <div
              style={{
                ...styles.filledTrack,
                width: `${Math.abs(50 - percentage)}%`,
                left:
                  percentage - 50 < 0
                    ? `${percentage}%`
                    : `${Math.max(percentage - 50, 50)}%`,
                right: percentage - 50 < 0 ? "50%" : `100%`,
              }}
            ></div>

            {/* Divisions */}
            {divisions.map((division, index) => {
              const divisionPercentage = ((division - min) / (max - min)) * 100;
              return (
                <div
                  key={index}
                  style={{
                    ...styles.divisions,
                    left: `${divisionPercentage}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Slider Handle */}
          <div
            style={{
              ...styles.sliderHandle,
              left: `${percentage}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  label: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "10px",
  },
  sliderContainer: {
    width: "100%",
    margin: "20px 0px",
    userSelect: "none",
  },
  slider: {
    position: "relative",
    height: "30px",
  },
  sliderHandle: {
    position: "absolute",
    top: "50%",
    width: "18px",
    height: "18px",
    backgroundColor: "#024CAA",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  },
  track: {
    position: "absolute",
    top: "50%",
    left: 0,
    width: "100%",
    height: "8px",
    background: "#e0e0e0",
    transform: "translateY(-50%)",
    overflow: "hidden",
  },
  filledTrack: {
    position: "absolute",
    height: "100%",
    background: "#4CC9FE",
    borderRadius: "3px",
  },
  divisions: {
    position: "absolute",
    bottom: 0,
    width: "1px",
    height: "10px",
    background: "lightGrey",
    transform: "translateX(-50%)",
  },
};

export default PropertyWithSlider;
