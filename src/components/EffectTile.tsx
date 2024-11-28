
interface EffectTileProps {
    title: string,
    onClick: () => void,
}

export default function EffectTile({ title, onClick }: EffectTileProps) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100px",
        }}>
            <button style={{
                borderRadius: 5,
                backgroundColor: "whitesmoke",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                aspectRatio: "1/1",
                fontSize: "25px",
            }} onClick={onClick}>
                <span>{title[0].toUpperCase()}</span>
            </button>
            <span style={{ textAlign: "center" }}>{title}</span>
        </div>
    )
}