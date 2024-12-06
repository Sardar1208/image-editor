interface EffectTileProps {
  title: string;
  onClick: () => void;
}

export default function EffectTile({ title, onClick }: EffectTileProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        backgroundColor: "#1E1E2E",
        padding: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv69-TPxuaykcT38rMUIwPlSNgR3Ye7l1KXA&s"}
          alt="Tile Icon"
          style={{
            width: "30%",
            height: "auto",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <span
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            flex: 1,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
