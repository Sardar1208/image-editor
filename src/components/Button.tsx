interface ButtonProps {
    text: string,
    color: string,
    onClick: () => void;
}

export default function Button({ text, color, onClick }: ButtonProps) {
    return <button style={{
        borderRadius: "8px",
        border: "1px solid transparent",
        padding: "0.6em 1.2em",
        fontSize: "1em",
        fontWeight: "500",
        backgroundColor: color,
        cursor: "pointer",
        transition: "border-color 0.25s",
    }} onClick={onClick} >
        {text}
    </button>
}