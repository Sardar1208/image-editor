import React, { useState, useRef, useCallback } from "react";

interface CustomSliderProps {
    label: string;
    defaultValue?: number;
    min?: number;
    max?: number;
    color?: string;
    onChange: (value: number) => void;
    onChangeCommitted: (value: number) => void;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
    label,
    defaultValue = 0,
    min = -10,
    max = 10,
    color = "blue",
    onChange,
    onChangeCommitted,
}) => {
    const [value, setValue] = useState(defaultValue);
    const isDragging = useRef(false);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = useCallback(() => {
        if (isDragging.current) {
            onChangeCommitted(value);
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
                onChange(newValue);
            }
        },
        [value, min, max, onChange]
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
            onChange(newValue);
            onChangeCommitted(newValue);
        },
        [min, max, onChange, onChangeCommitted]
    );

    const percentage = ((value - min) / (max - min)) * 100;

    // Generate divisions based on the min and max range
    const divisions = Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return (
        <div
            style={{
                width: "100%",
                margin: "20px 0",
                userSelect: "none",
            }}
        >
            <div
                style={{
                    position: "relative",
                    height: "30px", // Increased height to make space for tick marks
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={handleClick}
            >
                {/* Track */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        width: "100%",
                        height: "8px",
                        background: "#e0e0e0",
                        // borderRadius: "3px",
                        transform: "translateY(-50%)",
                        overflow: "hidden",
                    }}
                >
                    {/* Filled Track */}
                    <div
                        style={{
                            position: "absolute",
                            height: "100%",
                            background: "#4CC9FE",
                            width: `${Math.abs(50 - percentage)}%`,
                            left: percentage - 50 < 0 ? `${percentage}%` : `${Math.max(percentage - 50, 50)}%`,
                            right: percentage - 50 < 0 ? "50%" : `100%`,
                            borderRadius: "3px",
                        }}
                    ></div>

                    {/* Divisions */}
                    {divisions.map((division, index) => {
                        const divisionPercentage =
                            ((division - min) / (max - min)) * 100;
                        return (
                            <div
                                key={index}
                                style={{
                                    position: "absolute",
                                    left: `${divisionPercentage}%`,
                                    bottom: 0,
                                    width: "1px",
                                    height: "10px",
                                    background: "lightGrey",
                                    transform: "translateX(-50%)",
                                }}
                            />
                        );
                    })}
                </div>

                {/* Slider Handle */}
                <div
                    style={{
                        position: "absolute",
                        left: `${percentage}%`,
                        top: "50%",
                        width: "18px",
                        height: "18px",
                        backgroundColor: "#024CAA",
                        borderRadius: "50%",
                        transform: "translate(-50%, -50%)",
                        cursor: "pointer",
                    }}
                ></div>


            </div>
        </div>
    );
};

export default CustomSlider;
